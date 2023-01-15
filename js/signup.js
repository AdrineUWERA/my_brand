var form = document
  .getElementById("signup-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    //gets each user input
    var fullName = document.getElementById("full-name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var submitMessage = document.getElementById("errors-success");

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/   
    //   var regex = new RegExp(expression);

    // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
    if (!fullName || !email || !password || !confirmPassword) {
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
      var uniqueId = Date.now().toString();
      var newUser = {
        id: uniqueId,
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      // checks if there are some messages stored previously in the local storage and retrieve them if any
      //If there no previously added messages, the newly added message will be added to the local storage
      if (localStorage.getItem("users") == null) {
        var users = [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User created! </p> </div>';

        console.log(JSON.parse(localStorage.getItem("users")));
        clearForm();
      } else {
        // localStorage.removeItem("messages");
        // if there are some previously stored bookmarks, then they wil be retrieved, and the newly added
        // bookmark will be pushed to the bookmarks in the local storage
        var users = JSON.parse(localStorage.getItem("users"));

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User created! </p> </div>';

        console.log(JSON.parse(localStorage.getItem("users")));
        clearForm();
      }
    }
  });

// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("full-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}
