let url = "";
var imageInput = document.getElementById("cover-image");
imageInput.addEventListener("change", () => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(imageInput.files[0]);
  fileReader.addEventListener("load", () => {
    url = fileReader.result;
    console.log(url);
  });
});

var form = document
  .getElementById("add-blog-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    //gets each user input
    var title = document.getElementById("title").value;
    var category = document.getElementById("category").value;
    var coverImage = document.getElementById("cover-image").value;
    var content = document.getElementById("content").value;
    var references = document.getElementById("references").value;
    var submitMessage = document.getElementById("errors-success");
    var likes = 0;
    var comments = [];
    //   var regex = new RegExp(expression);
    var regexSpaceInputs =  /\S/g;

    // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
    if (!title || !category || !coverImage || !content || !references) {
      //   alert("Please fill all fields!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill all fields! </p> </div>';
    } 
    else if (!regexSpaceInputs.test(title)) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The title should not be just spaces. </p> </div>';
    }    
    else if (!regexSpaceInputs.test(category)) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The category should not be just spaces. </p> </div>';
    }    
    else if (!regexSpaceInputs.test(content)) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The content should not be just spaces. </p> </div>';
    }   
    else {
      // otherwise, user input for each field will be stored in an object
      //generated a unique id using date.now() because it will always be unique
      const uniqueId = Date.now().toString();
      //   let url="";
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      var newBlog = {
        id: uniqueId,
        datePublished: formattedDate,
        title: title,
        category: category,
        coverImage: url,
        content: content,
        references: references,
        likes: likes,
        comments: comments,
      };

      // checks if there are some messages stored previously in the local storage and retrieve them if any
      //If there no previously added messages, the newly added message will be added to the local storage
      if (localStorage.getItem("blogs") == null) {
        var blogs = [];
        blogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Blog added! </p> </div>';

        console.log(JSON.parse(localStorage.getItem("blogs")));
        clearForm();
      } else { 
        // if there are some previously stored bookmarks, then they wil be retrieved, and the newly added
        // bookmark will be pushed to the bookmarks in the local storage
        var blogs = JSON.parse(localStorage.getItem("blogs"));

        blogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Blog added! </p> </div>';

        console.log(JSON.parse(localStorage.getItem("blogs")));
        clearForm();
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
