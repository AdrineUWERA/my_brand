const getUserloggedin = JSON.parse(localStorage.getItem("userloggedin"));
// console.log(loggedin);

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

console.log(parseJwt(getUserloggedin.token))

if (!getUserloggedin) {
  window.location.href = "login.html";
} else {
  if (parseJwt(getUserloggedin.token).role !== "admin") { 
    window.history.back();
  }
}
 