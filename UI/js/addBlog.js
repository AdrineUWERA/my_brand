const LoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));
console.log(LoggedInUser);

var form = document
  .getElementById("add-blog-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    //gets each user input
    var title = document.getElementById("title").value;
    var category = document.getElementById("category").value;
    // var coverImage = document.getElementById("cover-image").value;
    var coverImage = document.getElementById("cover-image");
    var content = document.getElementById("content").value;
    var references = document.getElementById("references").value;
    var submitMessage = document.getElementById("errors-success");
    var likes = 0;
    var comments = [];
    //   var regex = new RegExp(expression);
    var regexSpaceInputs = /\S/g;

    if (LoggedInUser && LoggedInUser.role === "admin") {
      console.log("in");
      // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
      if (!title || !category || !coverImage || !content || !references) {
        //   alert("Please fill all fields!");
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill all fields! </p> </div>';
      } else if (!regexSpaceInputs.test(title)) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The title should not be just spaces. </p> </div>';
      } else if (!regexSpaceInputs.test(category)) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The category should not be just spaces. </p> </div>';
      } else if (!regexSpaceInputs.test(content)) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The content should not be just spaces. </p> </div>';
      } else if (!coverImage.files[0]) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The cover image is required. </p> </div>';
      } else {
        var data = new FormData();

        data.append("title", title);
        data.append("category", category);
        data.append("coverImage", coverImage.files[0]);
        data.append("content", content);
        data.append("references", references);

        const token = LoggedInUser.token;
        console.log(token);

        const addedBlog = await fetch(
          "https://mybrand-production.up.railway.app/blogs",
          {
            method: "POST",
            body: data,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resBody = await addedBlog.json();
        console.log(addedBlog.status);
        if (addedBlog.status === 201) {
          clearForm();
          submitMessage.innerHTML =
            '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
            '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Blog added! </p> </div>';
        }

        else if (resBody[0].error) {
          console.log(addedBlog.error);
        } else if (resBody[0].message) {
          submitMessage.innerHTML = `<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >
          <p style="width: 100%; margin:0; padding: 0; text-align: center;"> ${resBody[0].message} </p> </div>`;
        }
        // else {

        // }
      }
    }
  });

// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("cover-image").value = "";
  document.getElementById("content").value = "";
  document.getElementById("references").value = "";
}
