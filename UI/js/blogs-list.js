
const retrieving = async () => {
  // https://mybrand-production.up.railway.app/
  let allBlogs = await fetch("https://mybrand-production.up.railway.app/blogs", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.data.map((blog) => {
        let date = new Date(blog.datePublished);
        const datePublished = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        let shortDescription;
        if (blog.content.split(" ").length > 100) {
          shortDescription =
            blog.content.split(" ").slice(0, 100).join(" ") + " ...";
        } else {
          shortDescription = blog.content;
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
      const retrievedBlogs = data.data;
      console.log("retrievedBlogs", retrievedBlogs);
      for (let i = 0; i < selectedBlog.length; i++) {
        let title = selectedBlog[i].querySelector("h4").innerHTML;
        console.log("title", title);
        selectedBlog[i].addEventListener("click", (e) => {
          e.preventDefault();
          for (let j = 0; j < retrievedBlogs.length; j++) {
            if (i == j) {
              let blogId = retrievedBlogs[j]._id;
              console.log(blogId);
              localStorage.setItem("selectedBlog", JSON.stringify(blogId));
              window.location.href = "blog-page.html";
            }
          }
        });
      }
    });

  // const selectedBlog = document.querySelectorAll(".blog-link");
  // console.log(allBlogs);
  // for (let i = 0; i < selectedBlog.length; i++) {
  //   let title = selectedBlog[i].querySelector("h4").innerHTML;
  //   selectedBlog[i].addEventListener("click", (e) => {
  //     e.preventDefault();
  //     console.log(title, i);
  //     for (let j = 0; j < allBlogs.length; j++) {
  //       if (i == j) {
  //         let blogId = allBlogs[j].id;
  //         console.log(blogId);
  //         localStorage.setItem("selectedBlog", JSON.stringify(blogId));
  //         window.location.href = "blog-page.html";
  //       }
  //     }
  //   });
  // }
};

window.onload = () => {
  retrieving();
};
