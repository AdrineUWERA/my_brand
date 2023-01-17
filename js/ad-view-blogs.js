let allBlogs = [];
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
    if(blog.title.split(" ").length > 6){
      displayTitle = blog.title.split(" ").slice(0, 6).join(" ") + '...';
    } else{
      displayTitle= blog.title;
    }
    container.innerHTML += `
    <div class="card">
      <div>
        <img src=${coverImg.src} alt="" />
        <p>${displayTitle}</p>
      </div>
      <div class="card-links">
        <a class="blog-link" href="blog-page.html"><span>view blog -></span></a>
        <a class="update-link" href="ad-update-blog.html">update blog -></a>
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
};

window.onload = () => {
  retrieving();
};
