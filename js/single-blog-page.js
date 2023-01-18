const getBlogId = JSON.parse(localStorage.getItem("selectedBlog"));
console.log("fromurl", getBlogId);
let allBlogs = [];
const retrieving = async () => {
  allBlogs = await JSON.parse(localStorage.getItem("blogs"));
  console.log(allBlogs);
  let thisBlog = allBlogs.filter((blog) => blog.id === getBlogId);
  let blogDetails = thisBlog[0];
  console.log("this blog", blogDetails);

  const coverImg = new Image();
  coverImg.src = blogDetails.coverImage;
  let date = new Date(blogDetails.datePublished);
  console.log(date);

  const datePublished = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const references = blogDetails.references.split("");
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
          src=${coverImg.src}
          alt="cover image" 
      />
      <p class="long-description">${blogDetails.content} </p>
    </div>
  `;

  const likesNumber = document.getElementById("likes-nbr");
  likesNumber.innerHTML = `${blogDetails.likes} Likes`;

  const commentsNumber = document.getElementById("comments-nbr");
  commentsNumber.innerHTML = `${blogDetails.comments.length} Comments`;

  let linksList = blogDetails.references.split(/\n+/g);
  // let linksList = blogDetails.references.split(/\d.\s|\d.|\n+/g);
  console.log(linksList);

  
  if(blogDetails.references.length != 0) {
    const linksTitleContainer = document.getElementById("reference-links-title");
    linksTitleContainer.innerHTML += `Links:`;
  }

  const linksContainer = document.getElementById("links-list");
  linksList.map((link) => {
    linksContainer.innerHTML += ` 
    <li>${link}</li>
 `;
  });

  const commentsContainer = document.getElementById("all-comments");
  if(blogDetails.comments.length != 0) {
    const commentTitleContainer = document.getElementById("comments-title-container");
    commentTitleContainer.innerHTML += ` 
      <span class="title">Comments</span>
      <div><img src="assets/Line 3.png" alt=""/></div>
    `;
  }
  blogDetails.comments.reverse().map((comment) => {
    commentsContainer.innerHTML += ` 
      <div class="comment-content">
        <h4>User name</h4>
        <!-- <h4>${comment.user}</h4> -->
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
      // otherwise, user input for each field will be stored in an object
      //generated a unique id using date.now() because it will always be unique
      const uniqueId = Date.now().toString();
      //   let url="";
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      var newComment = {
        id: uniqueId,
        dateAdded: formattedDate,
        comment: comment,
      }; 

      let allBlogs = [];
      allBlogs = JSON.parse(localStorage.getItem("blogs"));
      console.log(allBlogs);

      for (let i = 0; i < allBlogs.length; i++) {
        if (allBlogs[i].id === getBlogId) { 
          allBlogs[i].comments.push(newComment);
          console.log(allBlogs[i]);
        }
      }
      
      localStorage.setItem("blogs", JSON.stringify(allBlogs));
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Comment Added! </p> </div>';
 
      console.log(JSON.parse(localStorage.getItem("blogs")));
      // retrieving();
      window.location = "blog-page.html"
      clearForm(); 
     
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
