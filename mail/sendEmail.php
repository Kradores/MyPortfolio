<?php

require_once("Configuration.php");

set_time_limit(10);

$message = "MyPortfolio" . "\n\n" .
    "From: " . $_POST['name'] . "\n" .
    "Email: " . $_POST['email'] . "\n\n" .
    "Message:\n" . $_POST['message'];

if (smtp_mail(Configuration::EMAIL, $_POST['subject'], $message, "Reply-To: " . $_POST['email'])) {
    echo json_encode(["Message" => "Email Sent Successfuly"]);
} else {
    echo json_encode(["Message" => "Could not send email, please try again later!"]);
}

function smtp_mail($to, $subject, $message, $headers = '')
{
    $recipients = explode(',', $to);
    $user = Configuration::EMAIL;
    $pass = Configuration::PASS;
    $smtp_host = Configuration::SMPT_HOST;
    $smtp_port = Configuration::SMTP_PORT;

    if (!($socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 15))) {
        echo json_encode(["Message" => "Error connecting to '$smtp_host' ($errno) ($errstr)"]);
    }
    server_parse($socket, '220');
    fwrite($socket, 'EHLO localhost' . "\r\n");

    server_parse($socket, '250');
    fwrite($socket, 'AUTH LOGIN' . "\r\n");

    server_parse($socket, '334');
    fwrite($socket, base64_encode($user) . "\r\n");

    server_parse($socket, '334');
    fwrite($socket, base64_encode($pass) . "\r\n");

    server_parse($socket, '235');
    fwrite($socket, 'MAIL FROM: <' . $user . '>' . "\r\n");

    server_parse($socket, '250');
    foreach ($recipients as $email) {
        fwrite($socket, 'RCPT TO: <' . $email . '>' . "\r\n");
        server_parse($socket, '250');
    }
    fwrite($socket, 'DATA' . "\r\n");

    server_parse($socket, '354');
    fwrite(
        $socket,
        'Subject: ' . $subject . "\r\n"
            . 'To: <' . implode('>, <', $recipients) . '>' . "\r\n"
            . $headers . "\r\n\r\n"
            . $message . "\r\n"
    );
    fwrite($socket, '.' . "\r\n");
    server_parse($socket, '250');
    fwrite($socket, 'QUIT' . "\r\n");
    fclose($socket);
    return true;
}

//Functin to Processes Server Response Codes
function server_parse($socket, $expected_response)
{
    $server_response = '';
    $counter = 0;
    while (substr($server_response, 3, 1) != ' ') {
        if (!($server_response = fgets($socket, 256))) {
            $counter++;
            if ($counter % 100 == 0) {
                echo json_encode(["Message" => "Error fetching response from server $expected_response"]);
                sleep(1);
            }
        }
    }
    if (!(substr($server_response, 0, 3) == $expected_response)) {
        echo json_encode(["Message" => 'Unable to send e-mail."' . $server_response . '"' . " $expected_response"]);
    }
}
