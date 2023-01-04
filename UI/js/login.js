function closePopup() {
  let popUp = document.getElementById("already-logged-in");
  popUp.style.visibility = "hidden";
}

const LoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));
console.log(LoggedInUser);
if (LoggedInUser) {
  // let popUp = document.getElementById("already-logged-in");
  // popUp.style.visibility = "visible";
  // setTimeout(() => {
  //   popUp.style.visibility = "hidden";
  // }, 5000);
  // window.location.href = "index.html";
  window.history.back();
}

var form = document
  .getElementById("login-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const LoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(LoggedInUser);
    // if (LoggedInUser) {
    //   // let popUp = document.getElementById("already-logged-in");
    //   // popUp.style.visibility = "visible";
    //   // setTimeout(() => {
    //   //   popUp.style.visibility = "hidden";
    //   // }, 5000);
    //   window.location.href = "index.html";
    //   // window.history.go(-1);
    // } else {
    //gets each user input
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var submitMessage = document.getElementById("errors-success");

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //   var regex = new RegExp(expression);

    // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
    if (!email || !password) {
      //   alert("Please fill all fields!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill all fields! </p> </div>';
    }
    // checks if the email has a correct format i.e valid
    else if (!email.match(regex)) {
      //   alert("Please provide a valid email!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Invalid email! </p> </div>';
    } else {
      // otherwise, user input for each field will be stored in an object
      //generated a unique id using date.now() because it will always be unique
      // var uniqueId = Date.now().toString();
      var loginCredentials = {
        email: email,
        password: password,
      };

      const userloggedIn = await fetch(
        "https://mybrand-production.up.railway.app/users/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginCredentials),
        }
      );

      const userloggedInJSON = await userloggedIn.json();
      console.log(userloggedInJSON);

      if (userloggedInJSON.token) {
        localStorage.setItem(
          "userloggedin",
          JSON.stringify({
            token: userloggedInJSON.token,
            role: userloggedInJSON.role,
          })
        );

        console.log(localStorage.getItem("userloggedin"));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User logged in </p> </div>';

        if (userloggedInJSON.role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else { 
            window.history.back(); 
        }
      } else if (userloggedInJSON.error) {
        console.log(userloggedIn.error);
      } else if (userloggedInJSON.message && !userloggedInJSON.token) {
        submitMessage.innerHTML = `<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >
          <p style="width: 100%; margin:0; padding: 0; text-align: center;"> ${userloggedInJSON.message} </p> </div>`;
      }

      clearForm();
    }
  });

// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

document.getElementById("show-password").addEventListener("click", (e) => {
  var passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    document.getElementById("hide-password").style.display = "inline";
    document.getElementById("show-password").style.display = "none";
  }
});

document.getElementById("hide-password").addEventListener("click", (e) => {
  var passwordInput = document.getElementById("password");
  if (passwordInput.type === "text") {
    passwordInput.type = "password";
    document.getElementById("show-password").style.display = "inline";
    document.getElementById("hide-password").style.display = "none";
  }
});
