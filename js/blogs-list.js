let allBlogs = [];
const retrieving = async () => {
  allBlogs = await JSON.parse(localStorage.getItem("blogs"));
  console.log(allBlogs);
  allBlogs.map((blog) => {
    let date = new Date(blog.datePublished);
    const datePublished = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    let shortDescription;
    if (blog.content.split(" ").length > 100) {
      shortDescription =
        blog.content.split(" ").slice(0, 100).join(" ") + " ...";
    } else {
      shortDescription = blog.title;
    }

    const container = document.getElementById("blogs-list");
    container.innerHTML += `
    <div class="blog-summary">
        <a class="blog-link" href="blog-page.html"><h4>${blog.title}</h4></a>
        <p>${datePublished} | ${blog.category.toUpperCase()}</p>
        <p class="short-description">
       ${shortDescription}
        </p>
    </div>`;
  });

  const selectedBlog = document.querySelectorAll(".blog-link");
  for (let i = 0; i < selectedBlog.length; i++) {
    let title = selectedBlog[i].querySelector("h4").innerHTML;
    selectedBlog[i].addEventListener("click", (e) => {
      e.preventDefault();
      console.log(title, i);
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

};

window.onload = () => {
  retrieving();
};
