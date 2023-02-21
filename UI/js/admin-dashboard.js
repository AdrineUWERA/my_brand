const getUserloggedin = JSON.parse(localStorage.getItem("userloggedin"));
// console.log(loggedin);

if (!getUserloggedin) {
  window.location.href = "login.html";
} else {
  if (getUserloggedin.role !== "admin") { 
    window.history.back();
  }
}
 