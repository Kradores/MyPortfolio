const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector("ul.nav-items");

hamburger.addEventListener("click", function () {
	navList.classList.toggle("open");
});
