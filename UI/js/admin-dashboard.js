const getUserloggedin = JSON.parse(localStorage.getItem("userloggedin"));
// console.log(loggedin);

if (getUserloggedin.role !== "admin") {
  window.location.href = "denied-access.html";
} 

