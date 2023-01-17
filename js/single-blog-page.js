const getBlogId = JSON.parse(localStorage.getItem("selectedBlog"));
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
  const container = document.getElementById("blogs");
  container.innerHTML = `
    <div class="section-title">
        <p class="date">${datePublished}</p>
        <p class="title">
           ${blogDetails.title}
        </p>
    </div>
    <div class="section-content">
        <div class="blog-details" id="blog-details">
            <div class="blog-content">
                <img
                    class="blog-cover"
                    src=${coverImg.src}
                    alt="cover image"
                />
                <p class="long-description">${blogDetails.content} </p>
            </div>
            <div class="reference-links">
                    <h3>Links:</h3> 
                    <ol>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </li>
                      <li>
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </li>
                      <li>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum
                      </li>
                    </ol>
                    
                  </div>
                  <div class="engagement">
                    <i class="fa-solid fa-heart"></i>
                    <span class="nbr-likes">12 Likes</span>
                    <i class="fa-solid fa-comments"></i> <span>2 Comments</span>
                  </div>
                  <div class="add-comment">
                    <div class="section-title">
                      <span class="title">Add a comment</span>
                      <div><img src="assets/Line 3.png" alt="" /></div>
                    </div>
                    <div class="comment-form">
                      <form action="">
                        <div class="field">
                          <label for="email">Comment:</label>
                          <textarea
                            placeholder="Add your comment"
                            type="email"
                          ></textarea>
                        </div>
                        <button class="submit-btn">Submit</button>
                      </form>
                    </div>
                  </div>
                  <div class="comments">
                    <div class="section-title">
                      <span class="title">Comments</span>
                      <div><img src="assets/Line 3.png" alt="" /></div>
                    </div>
                    <div class="all-comments">
                      <div class="comment-content">
                        <h4>User Name</h4>
                        <p>YYYY-MM-DD</p>
                        <p class="short-description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                      <div class="comment-content">
                        <h4>User Name</h4>
                        <p>YYYY-MM-DD</p>
                        <p class="short-description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                      <div class="comment-content">
                        <h4>User Name</h4>
                        <p>YYYY-MM-DD</p>
                        <p class="short-description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>`;
            
};

window.onload = () => {
  retrieving();
};
