# MyPortfolio
Minimalistic project. Uses HTML, CSS, JS, PHP.


If you want email to work - you should add <b>/mail/Configuration.php</b> with constants used in <b>sendEmail.php</b>, for example: 
<br/>
<pre>
<code>class Configuration<br/>
{<br/>
    const EMAIL = "example@gmail.com";<br/>
    const PASS = "secret123";<br/>
    const SMPT_HOST = "ssl://smtp.gmail.com";<br/>
    const SMTP_PORT = 465;<br/>
}<br/></code>
</pre>
