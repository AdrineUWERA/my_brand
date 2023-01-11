function closePopup() {
  let popUp = document.getElementById("already-logged-in");
  popUp.style.visibility = "hidden";
}

const LoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));
console.log(LoggedInUser);
if (LoggedInUser) {
  window.history.go(-1);
}

var form = document
  .getElementById("signup-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    //gets each user input
    var fullName = document.getElementById("full-name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var submitMessage = document.getElementById("errors-success");

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //   var regex = new RegExp(expression);
    var regexSpaceInputs = /^\S\S*/g;
    var regPass = /\S/g;

    // let found = false;
    // var users = [];
    // var users = JSON.parse(localStorage.getItem("users"));
    // if (users) {
    //   for (let i = 0; i < users.length; i++) {
    //     if (users[i].email === email) {
    //       found = true;
    //     }
    //   }
    // }

    // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
    if (!fullName && !email && !password && !confirmPassword) {
      //   alert("Please fill all fields!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill all fields! </p> </div>';
    } else if (!regPass.test(fullName)) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The name is required. </p> </div>';
    } else if (!email.match(regex)) {
      //   alert("Please provide a valid email!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Invalid email! </p> </div>';
    } else if (!email) {
      //   alert("Please provide a valid email!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Email is required</p> </div>';
    } else if (!password) {
      //   alert("Please provide a valid email!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Password is required</p> </div>';
    } else if (!confirmPassword) {
      //   alert("Please provide a valid email!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Please confirm you password</p> </div>';
    } else if (
      !regexSpaceInputs.test(password) &&
      !regexSpaceInputs.test(confirmPassword)
    ) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The passwords should not have spaces at the beginning and end, and not be just spaces. </p> </div>';
    } else if (password.length < 6) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The password should be at least 6 characters. </p> </div>';
    }
    // checks if the email has a correct format i.e valid
    else if (password !== confirmPassword) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Passwords do not match! </p> </div>';
    } else {
      var newUser = {
        // id: uniqueId,
        // role: "user",
        fullName: fullName,
        email: email,
        password: password,
      };

      const user = await fetch(
        "https://mybrand-production.up.railway.app/users/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const userJSON = await user.json();
      console.log(userJSON);

      if (user.status === 201) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User created! </p> </div>';

        clearForm();
      } else if (user.status === 400) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The user with this email already exists! </p> </div>';
      } 
    }
    // }
  });

// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("full-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
}

document.getElementById("show-password").addEventListener("click", (e) => {
  var passwordInput = document.getElementById("password");
  var confrirmpasswordInput = document.getElementById("confirm-password");
  if (
    passwordInput.type === "password" ||
    confrirmpasswordInput.type === "password"
  ) {
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

document
  .getElementById("show-confirm-password")
  .addEventListener("click", (e) => {
    var confirmpasswordInput = document.getElementById("confirm-password");
    if (confirmpasswordInput.type === "password") {
      confirmpasswordInput.type = "text";
      document.getElementById("hide-confirm-password").style.display = "inline";
      document.getElementById("show-confirm-password").style.display = "none";
    }
  });

document
  .getElementById("hide-confirm-password")
  .addEventListener("click", (e) => {
    var confirmpasswordInput = document.getElementById("confirm-password");
    if (confirmpasswordInput.type === "text") {
      confirmpasswordInput.type = "password";
      document.getElementById("show-confirm-password").style.display = "inline";
      document.getElementById("hide-confirm-password").style.display = "none";
    }
  });
