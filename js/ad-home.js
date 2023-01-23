let allBlogs = JSON.parse(localStorage.getItem("blogs"));
console.log(allBlogs)
let stats = document.getElementById("statistics");
let totalLikes = 0;
let totalComments = 0;

for(let i = 0; i < allBlogs.length; i++) {
    totalLikes+=allBlogs[i].likes;
    totalComments+=allBlogs[i].comments.length;
}

console.log(totalLikes);

stats.innerHTML += `
    <div class="card">
        <div>
            <i class="fa-solid fa-newspaper"></i>
        </div>
        <div class="card-stats">
            <p class="number">${allBlogs.length}</p>
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
