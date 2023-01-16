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
        <a href="blog-page.html">view blog -></a>
        <a href="ad-update-blog.html">update blog -></a>
      </div>
    </div>`;
  });
};

window.onload = () => {
  retrieving();
};
