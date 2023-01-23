let allBlogs = [];
const getBlogId = JSON.parse(localStorage.getItem("selectedBlog"));

const retrieving = async () => {
  allBlogs = await JSON.parse(localStorage.getItem("blogs"));
  console.log(allBlogs);
  allBlogs.sort((a, b) => a.id - b.id).reverse();
  allBlogs.map((blog) => {
    const container = document.getElementById("all-blogs");
    const coverImg = new Image();
    coverImg.src = blog.coverImage;
    // let truncatedText = text
    let displayTitle;
    if (blog.title.split(" ").length > 6) {
      displayTitle = blog.title.split(" ").slice(0, 6).join(" ") + "...";
    } else {
      displayTitle = blog.title;
    }
    container.innerHTML += `
    <div class="card">
      <div>
        <img src=${coverImg.src} alt="" />
        <p>${displayTitle}</p>
      </div>
      <div class="card-links">
        <a class="blog-link" href="blog-page.html"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a class="update-link" href="ad-update-blog.html"><i class="fa-solid fa-pen-to-square"></i></a>
        <i class="fa-solid fa-trash deleteBtn" id="delete-btn"></i> 
      </div>
    </div>`;
  });
  const selectedBlog = document.querySelectorAll(".blog-link");
  for (let i = 0; i < selectedBlog.length; i++) {
    selectedBlog[i].addEventListener("click", (e) => {
      e.preventDefault();
      for (let j = 0; j < allBlogs.length; j++) {
        if (i == j) {
          let blogId = allBlogs[j].id;
          console.log(blogId);
          localStorage.setItem("selectedBlog", JSON.stringify(blogId));
          window.location.href = "blog-page.html";
        }
      }
    });
  }

  const selectedBlog1 = document.querySelectorAll(".update-link");
  for (let i = 0; i < selectedBlog1.length; i++) {
    selectedBlog1[i].addEventListener("click", (e) => {
      e.preventDefault();
      for (let j = 0; j < allBlogs.length; j++) {
        if (i == j) {
          let blogId = allBlogs[j].id;
          console.log(blogId);
          localStorage.setItem("selectedBlogtoEdit", JSON.stringify(blogId));
          window.location.href = "ad-update-blog.html";
        }
      }
    });
  }

  const selectedBlog2 = document.querySelectorAll(".deleteBtn");
  for (let i = 0; i < selectedBlog2.length; i++) {
    selectedBlog2[i].addEventListener("click", (e) => {
      e.preventDefault();
      for (let j = 0; j < allBlogs.length; j++) {
        if (i == j) {
          let blogId = allBlogs[j].id;
          console.log(blogId);
          localStorage.setItem("selectedBlogToDelete", JSON.stringify(blogId));
          const blogToDelete = allBlogs.filter(
            (blog) => blog.id === allBlogs[j].id
          );
          let blogDetails = blogToDelete[0];
          // console.log(blogToDelete);

          allBlogs.splice(allBlogs.indexOf(blogDetails), 1);
          localStorage.setItem("blogs", JSON.stringify(allBlogs));
          console.log(allBlogs);
          window.location.href = "ad-view-blogs.html";
        }
      }
    });
  }
};

// if (allBlogs.length > 0) {
// document.getElementById("delete-btn").addEventListener("click", () => {
//   const idOfblogToDelete = JSON.parse(localStorage.getItem("selectedBlogToDelete"));

//   // window.location.href = "ad-view-blogs.html";
// });
// }
window.onload = () => {
  retrieving();
};
