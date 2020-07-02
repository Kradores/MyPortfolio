const navMenu = document.querySelectorAll("ul.nav-items");
const navItems = navMenu[0].children;

for (const navItemKey in navItems) {
	const navItem = navItems[navItemKey];
	if (typeof navItem !== "object") {
		continue;
	}
	navItem.children[0].addEventListener("click", function () {
		if (navItem.classList.contains("active") || navItem.classList.contains("active-reverse")) {
			return;
		}

		for (const itemKey in navItems) {
			if (
				navItems[itemKey].classList !== undefined &&
				(navItems[itemKey].classList.contains("active") ||
					navItems[itemKey].classList.contains("active-reverse")) &&
				navItemKey > itemKey
			) {
				navItem.classList.add("active");
				navItems[itemKey].classList = "";
			} else if (
				navItems[itemKey].classList !== undefined &&
				(navItems[itemKey].classList.contains("active") ||
					navItems[itemKey].classList.contains("active-reverse")) &&
				navItemKey < itemKey
			) {
				navItem.classList.add("active-reverse");
				navItems[itemKey].classList = "";
			}
		}
	});
}
