const getBlogId = JSON.parse(localStorage.getItem("selectedBlogtoEdit"));
// console.log("fromurl", getBlogId);
let allBlogs = [];

const LoggedInUser = JSON.parse(localStorage.getItem("userloggedin")); 
// console.log(loggedin);

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const updateBlog = async () => {
  const thisBlog = await fetch(
    `https://mybrand-production.up.railway.app/blogs/${getBlogId}`,
    {
      method: "GET",
    }
  );
  const thisBlogJson = await thisBlog.json();
  const blogDetails = thisBlogJson.data;
  console.log(blogDetails);

  document.getElementById("title").value = blogDetails.title;
  document.getElementById("category").value = blogDetails.category;
  document.getElementById("content").value = blogDetails.content;
  if (blogDetails.references != undefined) {
    document.getElementById("links").value = blogDetails.references;
  }

  var form = document
    .getElementById("update-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      //gets each user input
      var title = document.getElementById("title").value;
      var category = document.getElementById("category").value;
      var coverImage = document.getElementById("cover-image");
      var content = document.getElementById("content").value;
      var references = document.getElementById("links").value;
      var submitMessage = document.getElementById("errors-success");
      //   var regex = new RegExp(expression);
      var regexSpaceInputs = /\S/g;

      if (LoggedInUser && parseJwt(LoggedInUser.token).role === "admin") {
        // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
        if (!title && !category && !coverImage.files[0] && !content) {
          //   alert("Please fill all fields!");
          submitMessage.innerHTML =
            '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
            '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill all the required fields! </p> </div>';
        } else if (!regexSpaceInputs.test(title)) {
          submitMessage.innerHTML =
            '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
            '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The title is required. </p> </div>';
        } else if (!regexSpaceInputs.test(category)) {
          submitMessage.innerHTML =
            '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
            '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The category is required. </p> </div>';
        } else if (!regexSpaceInputs.test(content)) {
          submitMessage.innerHTML =
            '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
            '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The content is required. </p> </div>';
        } else {
          var data = new FormData();

          data.append("title", title);
          data.append("category", category);
          data.append("content", content);
          data.append("references", references);

          data.append("coverImage", coverImage.files[0]);

          const LoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));
          console.log(LoggedInUser);

          const addedBlog = await fetch(
            `https://mybrand-production.up.railway.app/blogs/${blogDetails._id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${LoggedInUser.token}`,
              },
              body: data,
            }
          );

          const resBody = await addedBlog.json();
          console.log(addedBlog.status);
          console.log(resBody);
          if (resBody._id && resBody.title) {
            submitMessage.innerHTML =
              '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
              '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Blog updated! </p> </div>';

            clearForm();

            localStorage.setItem(
              "selectedBlog",
              JSON.stringify(blogDetails._id)
            );

            window.location.href = "blog-page.html";
          } else if (resBody[0].message) {
            submitMessage.innerHTML =
              `<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >
              <p style="width: 100%; margin:0; padding: 0; text-align: center;">${resBody[0].message}</p> </div>`;
          }
        }
      } else {
        window.location.href = "index.html";
      }
    });
};

const saveChanges = () => {};
// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("cover-image").value = "";
  document.getElementById("content").value = "";
  document.getElementById("links").value = "";
}

window.onload = () => {
  updateBlog();
};
