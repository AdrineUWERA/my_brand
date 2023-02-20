const dynamicId = JSON.parse(localStorage.getItem("selectedBlog"));
console.log("fromurl", dynamicId);
const ALoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const allUsers = JSON.parse(localStorage.getItem("users"));

let allBlogs = []; 

const retrieving = async () => { 
  const thisBlog = await fetch(
    `https://mybrand-production.up.railway.app/blogs/${dynamicId}`,
    {
      method: "GET",
    }
  );
  const thisBlogJson = await thisBlog.json();
  const blogDetails = thisBlogJson.data;
  console.log(blogDetails)

  let likeBtn = document
    .getElementById("like-btn")
    .addEventListener("click", (e) => {
      if (!ALoggedInUser) {
        let popUp = document.getElementById("pop-up-container");
        popUp.classList.add("show-pop-up");

        setTimeout(() => {
          popUp.classList.remove("show-pop-up");
        }, 5000);
      } else {
        // console.log(thisUser[0].likedBlogs);
        if (ALoggedInUser.role === "user") {
          let thisUser = allUsers.filter(
            (user) => user.id === ALoggedInUser.id
          );
          if (thisUser[0].likedBlogs.includes(blogDetails.id)) {
            document.getElementById("like-btn").style.color = "#fff";
            for (let i = 0; i < allBlogs.length; i++) {
              if (allBlogs[i].id === dynamicId) {
                // allBlogs[i].id = blogDetails.id;
                // allBlogs[i].datePublished= blogDetails.datePublished;
                allBlogs[i].likes -= 1;
                localStorage.setItem("blogs", JSON.stringify(allBlogs));
                // console.log(allBlogs[i]);
              }
            }
            for (let i = 0; i < allUsers.length; i++) {
              if (allUsers[i].id === ALoggedInUser.id) {
                // allBlogs[i].id = blogDetails.id;
                // allBlogs[i].datePublished= blogDetails.datePublished;

                allUsers[i].likedBlogs.splice(
                  allUsers[i].likedBlogs.indexOf(blogDetails.id),
                  1
                );
                localStorage.setItem("users", JSON.stringify(allUsers));
                // console.log("after slice", allUsers[i].likedBlogs);
                // console.log(allUsers[i]);
              }
            }

            const likesNumber = document.getElementById("likes-nbr");
            likesNumber.innerHTML = `${blogDetails.likes} Likes`;
          } else {
            document.getElementById("like-btn").style.color = "#b1361e";

            for (let i = 0; i < allBlogs.length; i++) {
              if (allBlogs[i].id === dynamicId) {
                // allBlogs[i].id = blogDetails.id;
                // allBlogs[i].datePublished= blogDetails.datePublished;
                allBlogs[i].likes += 1;
                localStorage.setItem("blogs", JSON.stringify(allBlogs));
                // console.log(allBlogs[i]);
              }
            }
            for (let i = 0; i < allUsers.length; i++) {
              if (allUsers[i].id === ALoggedInUser.id) {
                // allBlogs[i].id = blogDetails.id;
                // allBlogs[i].datePublished= blogDetails.datePublished;
                allUsers[i].likedBlogs.push(blogDetails.id);
                localStorage.setItem("users", JSON.stringify(allUsers));
                // console.log(allUsers[i]);
              }
            }
            const likesNumber = document.getElementById("likes-nbr");
            likesNumber.innerHTML = `${blogDetails.likes} Likes`;
          }
        } else if (ALoggedInUser.role === "admin") {
          const admin = JSON.parse(localStorage.getItem("admin"));
          if (admin.likedBlogs.includes(blogDetails.id)) {
            document.getElementById("like-btn").style.color = "#fff";
            for (let i = 0; i < allBlogs.length; i++) {
              if (allBlogs[i].id === dynamicId) {
                // allBlogs[i].id = blogDetails.id;
                // allBlogs[i].datePublished= blogDetails.datePublished;
                allBlogs[i].likes -= 1;
                localStorage.setItem("blogs", JSON.stringify(allBlogs));
                // console.log(allBlogs[i]);
              }
            }
            admin.likedBlogs.splice(
              admin.likedBlogs.indexOf(blogDetails.id),
              1
            );

            console.log(admin);
            localStorage.setItem("admin", JSON.stringify(admin));

            const likesNumber = document.getElementById("likes-nbr");
            likesNumber.innerHTML = `${blogDetails.likes} Likes`;
          } else {
            document.getElementById("like-btn").style.color = "#b1361e";

            for (let i = 0; i < allBlogs.length; i++) {
              if (allBlogs[i].id === dynamicId) {
                // allBlogs[i].id = blogDetails.id;
                // allBlogs[i].datePublished= blogDetails.datePublished;
                allBlogs[i].likes += 1;
                localStorage.setItem("blogs", JSON.stringify(allBlogs));
                // console.log(allBlogs[i]);
              }
            }
            admin.likedBlogs.push(blogDetails.id);
            localStorage.setItem("admin", JSON.stringify(admin));
            // console.log(admin);
            localStorage.setItem("admin", JSON.stringify(admin));

            const likesNumber = document.getElementById("likes-nbr");
            likesNumber.innerHTML = `${blogDetails.likes} Likes`;
          }
        }

        // console.log(blogDetails);
      }
    });

  // const coverImg = new Image();
  coverImg = blogDetails.coverImage;
  console.log(coverImg);
  let date = new Date(blogDetails.datePublished);
  // console.log(date);

  const datePublished = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (blogDetails.references) {const references = blogDetails.references.split("");}
  const container = document.getElementById("section-title");
  const titleContainer = document.getElementById("section-title");
  titleContainer.innerHTML += ` 
    <p class="date">${datePublished} | <span>${blogDetails.category}</span></p>
    <p class="title">
        ${blogDetails.title}
    </p>
  `;

  const contentContainer = document.getElementById("blog-content");
  contentContainer.innerHTML = ` 
    <div class="blog-content">
      <img
          class="blog-cover"
          src=${coverImg}
          alt="cover image" 
      />
      <p class="long-description">${blogDetails.content} </p>
    </div>
  `;
  if (ALoggedInUser) {
    if (ALoggedInUser.role === "user") {
      let thisUser = allUsers.filter((user) => user.id === ALoggedInUser.id);
      if (thisUser[0].likedBlogs.includes(blogDetails.id)) {
        document.getElementById("like-btn").style.color = "#b1361e";
      }
    }
    if (ALoggedInUser.role === "admin") {
      const admin = JSON.parse(localStorage.getItem("admin"));
      if (admin.likedBlogs.includes(blogDetails.id)) {
        document.getElementById("like-btn").style.color = "#b1361e";
      }
    }
  }

  const likesNumber = document.getElementById("likes-nbr");
  likesNumber.innerHTML = `${blogDetails.likes} Likes`;

  const commentsNumber = document.getElementById("comments-nbr");
  commentsNumber.innerHTML = `${blogDetails.comments.length} Comments`;

  let linksList = blogDetails.references.split(/\n+/g);
  // let linksList = blogDetails.references.split(/\d.\s|\d.|\n+/g);
  // console.log(linksList);

  if (blogDetails.references.length != 0) {
    const linksTitleContainer = document.getElementById(
      "reference-links-title"
    );
    linksTitleContainer.innerHTML += `Links:`;
  }

  const linksContainer = document.getElementById("links-list");
  linksList.map((link) => {
    linksContainer.innerHTML += ` 
    <li>${link}</li>
 `;
  });

  const commentsContainer = document.getElementById("all-comments");
  if (blogDetails.comments.length != 0) {
    const commentTitleContainer = document.getElementById(
      "comments-title-container"
    );
    commentTitleContainer.innerHTML += ` 
      <span class="title">Comments</span>
      <div><img src="assets/Line 3.png" alt=""/></div>
    `;
  }
  blogDetails.comments.reverse().map((comment) => {
    commentsContainer.innerHTML += ` 
      <div class="comment-content">
        <!-- <h4>User name</h4> -->
        <h4>${comment.user}</h4>
        <p>${comment.dateAdded}</p>
        <p class="short-description">${comment.comment}</p>
      </div>
 `;
  });
};
 
var form = document
  .getElementById("comment-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    if (!ALoggedInUser) {
      let popUp = document.getElementById("pop-up-container");
      popUp.classList.add("show-pop-up");

      setTimeout(() => {
        popUp.classList.remove("show-pop-up");
      }, 5000);
       
    } else {
      //gets each user input
      var comment = document.getElementById("comment-message").value;
      var submitMessage = document.getElementById("errors-success");

      //   var regex = new RegExp(expression);
      var regexSpaceInputs = /\S/g;

      // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
      if (!comment) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill the comment field! </p> </div>';
      } else if (!regexSpaceInputs.test(comment)) {
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 50px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); padding: 5px 15px; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> The comment should not be just spaces. </p> </div>';
      } else {
         

        var newComment = { 
          user: ALoggedInUser.fullName, 
          comment: comment,
        };

        let allBlogs = [];
        allBlogs = JSON.parse(localStorage.getItem("blogs"));
        // console.log(allBlogs);

        for (let i = 0; i < allBlogs.length; i++) {
          if (allBlogs[i].id === dynamicId) {
            allBlogs[i].comments.push(newComment);
            // console.log(allBlogs[i]);
          }
        }

        localStorage.setItem("blogs", JSON.stringify(allBlogs));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Comment Added! </p> </div>';

        // console.log(JSON.parse(localStorage.getItem("blogs")));
        // retrieving();
        window.location = "blog-page.html";
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

window.onload = () => {
  retrieving();
};

function closePopup() {
  let popUp = document.getElementById("pop-up-container");
  popUp.classList.remove("show-pop-up");
}
