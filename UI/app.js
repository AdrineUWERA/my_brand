const theLoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));

if (theLoggedInUser) {
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("logout-btn").style.display = "inline";
}

document.getElementById("logout-btn").addEventListener("click", (e) => {
  JSON.parse(localStorage.removeItem("userloggedin"));
  window.location.href = "index.html"; 
   
});


// navbar menu display
const menu = document.querySelector("#mobile_menu");
const menuLinks = document.querySelector(".nav-links");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});
