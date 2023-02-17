// let allBlogs = JSON.parse(localStorage.getItem("blogs"));
// console.log(allBlogs);
let stats = document.getElementById("statistics");
let nbOfBlogs = 0;
let totalLikes = 0;
let totalComments = 0;

const calculateStats = async () => {
  const fetchedBlogs = await fetch(
    "https://mybrand-production.up.railway.app/blogs",
    {
      method: "GET",
    }
  );

  const allBlogsJSON = await fetchedBlogs.json();

  const allBlogs = allBlogsJSON.data;
  console.log(allBlogs);

  if (allBlogs) {
    for (let i = 0; i < allBlogs.length; i++) {
      totalLikes += allBlogs[i].likes;
      totalComments += allBlogs[i].comments.length;
    }
    nbOfBlogs = allBlogs.length;
  }

  console.log(totalLikes);

  stats.innerHTML += `
    <div class="card">
        <div>
            <i class="fa-solid fa-newspaper"></i>
        </div>
        <div class="card-stats">
            <p class="number">${nbOfBlogs}</p>
            <p class="stat-subject">Blogs published</p>
        </div>
    </div>
    <div class="card">
        <div>
            <i class="fa-solid fa-thumbs-up"></i>
        </div>
        <div class="card-stats">
            <p class="number">${totalLikes}</p>
            <p class="stat-subject">Total Likes</p>
        </div>
    </div>
    <div class="card">
        <div>
            <i class="fa-solid fa-comments"></i>
        </div>
        <div class="card-stats">
            <p class="number">${totalComments}</p>
            <p class="stat-subject">Total Comments</p>
        </div>
    </div>
`;
};

calculateStats();
