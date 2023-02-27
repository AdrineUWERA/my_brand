const dynamicId = JSON.parse(localStorage.getItem("selectedBlog"));
// console.log("fromurl", dynamicId);
const ALoggedInUser = JSON.parse(localStorage.getItem("userloggedin"));

// let blogDetails = {};
// const fecthBlogs = async () => {
// const thisBlog = await fetch(
//   `https://mybrand-production.up.railway.app/blogs/${dynamicId}`,
//   {
//     method: "GET",
//   }
// );
// const thisBlogJson = await thisBlog.json();
// blogDetails = thisBlogJson.data;
// console.log(blogDetails);
// };

// fecthBlogs();

const fetchLikes = async () => {
  const allLikesOnBlog = await fetch(
    `https://mybrand-production.up.railway.app/blogs/${dynamicId}/likes`,
    {
      method: "GET",
    }
  );

  const allLikesOnBlogJSON = await allLikesOnBlog.json();
  // console.log(commentsOnBlog.data);
  const allBLogLikes = allLikesOnBlogJSON.data;
  // console.log(allBLogLikes);

  const likesNumber = document.getElementById("likes-nbr");
  likesNumber.innerHTML = `${allBLogLikes.length} Likes`;
};

const retrieving = async () => {
  const thisBlog = await fetch(
    `https://mybrand-production.up.railway.app/blogs/${dynamicId}`,
    {
      method: "GET",
    }
  );
  const thisBlogJson = await thisBlog.json();
  const blogDetails = thisBlogJson.data;
  // console.log(blogDetails);

  // like functionality
  let likeBtn = document
    .getElementById("like-btn")
    .addEventListener("click", async (e) => {
      if (!ALoggedInUser) {
        let popUp = document.getElementById("pop-up-container");
        popUp.classList.add("show-pop-up");

        setTimeout(() => {
          popUp.classList.remove("show-pop-up");
        }, 5000);
      } else {
        const userLike = await fetch(
          `https://mybrand-production.up.railway.app/blogs/${dynamicId}/like`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${ALoggedInUser.token}`,
            },
          }
        );

        const userLikeJSON = await userLike.json();
        // console.log(commentsOnBlog.data);
        const userLikeOnBlog = userLikeJSON.data;
        // console.log(userLikeOnBlog);
        if (
          blogDetails.likes.includes(parseJwt(ALoggedInUser.token).id) &&
          userLikeOnBlog.length != 0
        ) {
          const unlike = await fetch(
            `https://mybrand-production.up.railway.app/blogs/${dynamicId}/likes`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ALoggedInUser.token}`,
              },
            }
          )
            .then(() => {
              // console.log("hi1");
              document.getElementById("like-btn").style.color = "#fff";
              // console.log("hi2");
            })
            .then(() => {
              fetchLikes();
            });
        } else {
          const like = await fetch(
            `https://mybrand-production.up.railway.app/blogs/${dynamicId}/likes`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${ALoggedInUser.token}`,
              },
            }
          )
            .then(() => {
              document.getElementById("like-btn").style.color = "#b1361e";
            })
            .then(() => {
              fetchLikes();
            });
        }
      }
    });

  // diplating blog details
  coverImg = blogDetails.coverImage;
  // console.log(coverImg);
  let date = new Date(blogDetails.datePublished);

  const datePublished = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  if (blogDetails.references) {
    const references = blogDetails.references.split("");
  }
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

  // retrieving one like
  if (ALoggedInUser) {
    const userLike = await fetch(
      `https://mybrand-production.up.railway.app/blogs/${dynamicId}/like`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ALoggedInUser.token}`,
        },
      }
    );

    const userLikeJSON = await userLike.json();
    // console.log(commentsOnBlog.data);
    const userLikeOnBlog = userLikeJSON.data;
    // console.log(userLikeOnBlog);

    if (
      blogDetails.likes.includes(parseJwt(ALoggedInUser.token).id) &&
      userLikeOnBlog.length != 0
    ) {
      document.getElementById("like-btn").style.color = "#b1361e";
    }
  }

  // displaying likes and comments

  const likesNumber = document.getElementById("likes-nbr");
  likesNumber.innerHTML = `${blogDetails.likes.length} Likes`;

  const commentsNumber = document.getElementById("comments-nbr");
  commentsNumber.innerHTML = `${blogDetails.comments.length} Comments`;
  displayComment();
  //reference list
  
  if (blogDetails.references) {
    let linksList = blogDetails.references.split(/\n+/g);
    // let linksList = blogDetails.references.split(/\d.\s|\d.|\n+/g);
    // console.log(linksList);

    if (blogDetails.references.length != 0) {
      const linksTitleContainer = document.getElementById(
        "reference-links-title"
      );
      linksTitleContainer.innerHTML += `Links:`;
      const linksContainer = document.getElementById("links-list");
      linksList.map((link) => {
        linksContainer.innerHTML += ` 
    <li>${link}</li>
 `;
      });
    }
  }
};

const displayComment = async () => {
  // displaying comments
  const blogComments = await fetch(
    `https://mybrand-production.up.railway.app/blogs/${dynamicId}/comments`,
    {
      method: "GET",
    }
  );

  const commentsOnBlogJSON = await blogComments.json();

  const commentsOnBlog = commentsOnBlogJSON.comments;
  // console.log(commentsOnBlog);

  const commentsNumber = document.getElementById("comments-nbr");
  commentsNumber.innerHTML = `${commentsOnBlog.length} Comments`;

  const commentsContainer = document.getElementById("all-comments");
  if (commentsOnBlog.length != 0) {
    const commentTitleContainer = document.getElementById(
      "comments-title-container"
    );
    commentTitleContainer.innerHTML += ` 
      <span class="title">Comments</span>
      <div><img src="assets/Line 3.png" alt=""/></div>
    `;
  }

  commentsOnBlog.reverse().map(async (comment) => {
    let date = new Date(comment.dateAdded);

    const dateAdded = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const userID = comment.userId;
    // console.log(userID);
    const userDet = await fetch(
      `https://mybrand-production.up.railway.app/users/${userID}`,
      { method: "GET" }
    );

    const userDetJSON = await userDet.json();
    const userInfo = userDetJSON.data;
    // console.log("comment user", userDetJSON);

    commentsContainer.innerHTML += ` 
      <div class="comment-content">
        <!-- <h4>User name</h4> -->
        <h4>${userInfo.fullName}</h4>
        <p>${dateAdded}</p>
        <p class="short-description">${comment.comment}</p>
      </div>
 `;
  });
};

// console.log(ALoggedInUser);
// console.log(parseJwt(ALoggedInUser.token))

// commenting
var form = document
  .getElementById("comment-form")
  .addEventListener("submit", async (e) => {
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
          comment: comment,
        };

        // console.log(parseJwt(ALoggedInUser));
        const commentAdded = await fetch(
          `https://mybrand-production.up.railway.app/blogs/${dynamicId}/comments`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${ALoggedInUser.token}`,
            },
            body: JSON.stringify(newComment),
          }
        );

        const commentJSON = commentAdded.json();
        // console.log(commentJSON.comment);

        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Comment Added! </p> </div>';

        // console.log(JSON.parse(localStorage.getItem("blogs")));
        // retrieving();
        // window.location = "blog-page.html";
        const commentsContainer = document.getElementById("all-comments");
        const commentTitleContainer = document.getElementById(
          "comments-title-container"
        );
        commentTitleContainer.innerHTML = "";
        commentsContainer.innerHTML = "";

        displayComment();
        clearForm();
      }
    }
  });

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// console.log(parseJwt(ALoggedInUser.token));

// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("comment-message").value = "";
}

window.onload = () => {
  retrieving();
};

function closePopup() {
  let popUp = document.getElementById("pop-up-container");
  popUp.classList.remove("show-pop-up");
}
