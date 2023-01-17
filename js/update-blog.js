const getBlogId = JSON.parse(localStorage.getItem("selectedBlogtoEdit"));
console.log("fromurl", getBlogId);
let allBlogs = [];
const retrieving = async () => {
  allBlogs = await JSON.parse(localStorage.getItem("blogs"));
  console.log(allBlogs);
  let thisBlog = allBlogs.filter((blog) => blog.id === getBlogId);
  let blogDetails = thisBlog[0];
  console.log("this blog",blogDetails);
 
  const coverImg = new Image();
  coverImg.src = blogDetails.coverImage; 
  let date = new Date(blogDetails.datePublished);
  console.log(date);

  const datePublished = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const references = blogDetails.references.split("")
  const container = document.getElementById("contact-form");

  //add when last updated date if u get time
  container.innerHTML = ``;      
};

window.onload = () => {
  retrieving();
};
