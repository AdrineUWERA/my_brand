const loggedin = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(loggedin);

if (loggedin.role !== "admin") {
  window.location.href = "denied-access.html";
} 

