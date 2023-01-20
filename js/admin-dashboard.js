const LoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(LoggedInUser);

if (LoggedInUser.role !== "admin") {
  window.location.href = "denied-access.html";
} 