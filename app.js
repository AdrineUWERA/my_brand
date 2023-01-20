const LoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (LoggedInUser) {
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("logout-btn").style.display = "inline";
}

document.getElementById("logout-btn").addEventListener("click", (e) => {
  JSON.parse(localStorage.removeItem("loggedInUser"));
//   window.location.href = document.referrer;
//   window.history.back();
   
});


// navbar menu display
const menu = document.querySelector("#mobile_menu");
const menuLinks = document.querySelector(".nav-links");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});
