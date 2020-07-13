const sendEmailButton = document.querySelector("div.send-message form a.button");
const sendEmailForm = sendEmailButton.parentElement;
sendEmailButton.addEventListener("click", sendEmail);

(function removeErrorBorderEvents() {
	for (const element of sendEmailForm) {
		if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
			element.addEventListener("click", function () {
				if (this.classList.contains("error-border")) {
					this.classList.remove("error-border");
				}
			});
		}
	}
})();

function sendEmail() {
	sendEmailButton.removeEventListener("click", sendEmail);
	sendXhrRequest(
		sendEmailForm.action,
		sendEmailForm.method,
		new FormData(sendEmailForm),
		doOnSuccess,
		doOnError
	);
}

function sendXhrRequest(url, type, data, onSuccessCallback, onErrorCallback) {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("load", onSuccessCallback);
	xhr.addEventListener("error", onErrorCallback);
	xhr.open(type, url);
	xhr.send(data);
}

function doOnSuccess() {
	const response = JSON.parse(this.responseText);
	animateButton(response);
	showErrorBorder(response);
	sendEmailButton.addEventListener("click", sendEmail);
}

function doOnError() {
	sendEmailButton.addEventListener("click", sendEmail);
	console.error(this);
}

function animateButton(response) {
	if (response.message == "success") {
		sendEmailButton.classList.add("check");
		sendEmailButton.classList.add("animate");
		setTimeout(function () {
			sendEmailButton.classList.remove("check");
			sendEmailButton.classList.remove("animate");
		}, 1000);
	} else {
		sendEmailButton.classList.add("clear");
		sendEmailButton.classList.add("animate");
		setTimeout(function () {
			sendEmailButton.classList.remove("clear");
			sendEmailButton.classList.remove("animate");
		}, 1000);
	}
}

function showErrorBorder(response) {
	if (response.type == "required") {
		const element = sendEmailForm.querySelector("[name=" + response.field + "]");
		element.classList.add("error-border");
	}
}
