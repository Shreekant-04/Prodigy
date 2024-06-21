document.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "#1565C0";
  } else {
    navbar.style.backgroundColor = "";
  }
});

document.getElementById("nav-toggle").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("show-menu");
});
