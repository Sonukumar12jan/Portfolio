let menuIcon = document.getElementById("menu-icon");
let navbar = document.getElementById("navbar");

menuIcon.onclick = () => {
  navbar.classList.toggle("active");
};

var typed = new Typed(".text", {
    strings: ["Web Developer", "UI/UX Designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});