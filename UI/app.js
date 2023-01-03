const theLoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));
// console.log(theLoggedInUser)
if (theLoggedInUser) {
  // console.log(theLoggedInUser)
  const userROLE = parseJwt(theLoggedInUser.token).role;
  // console.log("role",userROLE);
  document.getElementById("login-btn").style.display = "none";
  if (userROLE === "user") {
    document.getElementById("logout-btn").style.display = "inline";
  } else if (userROLE === "admin") { 
    const adminMenuBtn = document.querySelector("#admin-dropdown-btn");
    adminMenuBtn.style.display = "inline-block"; 

  }
}

document.getElementById("logout-btn").addEventListener("click", (e) => {
  JSON.parse(localStorage.removeItem("userloggedin"));
  document.getElementById("login-btn").style.display = "inline";
  document.getElementById("logout-btn").style.display = "none";
  window.location.href = "index.html";
});

document.getElementById("ad-logout-btn").addEventListener("click", (e) => {
  JSON.parse(localStorage.removeItem("userloggedin"));
  document.getElementById("login-btn").style.display = "inline";
  document.getElementById("logout-btn").style.display = "none";
  window.location.href = "index.html";
});

// navbar menu display
const menu = document.querySelector("#mobile_menu");
const menuLinks = document.querySelector(".nav-links");

menu.addEventListener("click", function (e) {
  e.preventDefault();
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

const adminMenu = document.querySelector(".admin-user-icon");
const adminMenuLinks = document.querySelector(".admin-menu");

adminMenu.addEventListener("click", function (e) {
  e.preventDefault();
  adminMenu.classList.toggle("is-active");
  adminMenuLinks.classList.toggle("active");
});

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
