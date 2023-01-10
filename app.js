// navbar menu display
const menu = document.querySelector("#mobile_menu");
const menuLinks = document.querySelector(".nav-links");

menu.addEventListener('click', function(){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});