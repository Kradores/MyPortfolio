function prepareNavItems() {
	var scrollAnimationElements = {};

	const navItems = document.querySelectorAll("ul.nav-items li");
	const sections = document.querySelectorAll("section");

	for (const key in navItems) {
		if (isNaN(key)) {
			continue;
		}
		scrollAnimationElements[key] = {
			navItem: navItems[key],
			section: sections[key],
		};
		scrollAnimationElements.length = navItems.length;
	}

	scrollAnimationElements.getBounds = function () {
		for (const key in this) {
			if (isNaN(key)) {
				continue;
			}
			this[key].bounds = this[key].section.getBoundingClientRect();
		}
	};

	return scrollAnimationElements;
}

const animateNavbar = new navbarAnmation();

window.addEventListener("scroll", function () {
	animateNavbar();
});

function navbarAnmation() {
	var scrollPos = 0;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	const scrollAnimationElements = prepareNavItems();

	return function animate() {
		scrollAnimationElements.getBounds();
		for (const key in scrollAnimationElements) {
			if (isNaN(key)) {
				continue;
			}

			if (
				scrollAnimationElements[key].bounds.bottom > viewportHeight * 0.6 &&
				scrollAnimationElements[key].bounds.bottom < viewportHeight * 1.4
			) {
				if (
					scrollAnimationElements[key].navItem.classList.contains("active") ||
					scrollAnimationElements[key].navItem.classList.contains("active-reverse")
				) {
					continue;
				}

				if (document.body.getBoundingClientRect().top < scrollPos) {
					if (key > 0) {
						scrollAnimationElements[+key - 1].navItem.classList = "deactivate";
						scrollAnimationElements[key].navItem.classList = "active";
					}
				} else {
					if (key < scrollAnimationElements.length - 1) {
						scrollAnimationElements[key].navItem.classList = "active-reverse";
						scrollAnimationElements[+key + 1].navItem.classList = "deactivate-reverse";
					}
				}
			}
		}

		scrollPos = document.body.getBoundingClientRect().top;
	};
}

function xhrRequest(url, type = "GET", data = null, onSuccessCallback, onErrorCallback) {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("load", onSuccessCallback);
	xhr.addEventListener("error", onErrorCallback);
	xhr.open(type, url);
	xhr.send(data);
}

function animateSendButton() {
	console.log(this.responseText);
}

function showError() {
	console.error(this);
}

const sendEmailButton = document.querySelector("div.send-message form a.button");
sendEmailButton.addEventListener("click", sendEmail);

function sendEmail() {
	const sendEmailForm = this.parentElement;
	xhrRequest(
		sendEmailForm.action,
		sendEmailForm.method,
		new FormData(sendEmailForm),
		animateSendButton,
		showError
	);
}
