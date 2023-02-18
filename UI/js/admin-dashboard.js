const loggedin = JSON.parse(localStorage.getItem("userloggedin"));
// console.log(loggedin);

if (loggedin.role !== "admin") {
  window.location.href = "denied-access.html";
} 

