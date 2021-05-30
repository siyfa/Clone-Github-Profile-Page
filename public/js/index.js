// Source Data
const sourceData = {
  user: JSON.parse(localStorage.getItem("user")),
  displayName: document.getElementById("fullname"),
  userName: document.getElementsByClassName("username"),
  userBio: document.getElementsByClassName("userbio"),
  profilePic: document.getElementsByClassName("prof-img"),
  repoCount: document.getElementsByClassName("repo-count"),
  projCount: document.getElementsByClassName("project-count"),
  reposContainer: document.querySelector("#repos"),
  navBarPic: document.getElementsByClassName("navpic"),
  monthArray: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novermber",
    "December",
  ],
};

// Checking if username is found
if (sourceData.user === null || sourceData.user === "") {
  alert("User not found, please input a valid username");
  window.location.href = "index.html";
} else {
  //Found username
  sourceData.displayName.innerHTML = sourceData.user.name;

  // display username
  for (const user_name of sourceData.userName) {
    user_name.innerHTML = sourceData.user.login;
  }

  // display bio
  for (const user_bio of sourceData.userBio) {
    user_bio.innerHTML = sourceData.user.bio;
  }

  // display profile picturre
  for (const user_prof_pic of sourceData.profilePic) {
    user_prof_pic.src = sourceData.user.avatarUrl;
  }

  // display navbar profile pic
  for (const nav_prof_pic of sourceData.navBarPic) {
    nav_prof_pic.src = sourceData.user.avatarUrl;
  }

  // repo count
  for (const repoC of sourceData.repoCount) {
    repoC.innerHTML =
      sourceData.user.repositories.totalCount === ""
        ? 0
        : sourceData.user.repositories.totalCount;
  }

  // project count
  for (const projC of sourceData.projCount) {
    projC.innerHTML =
      sourceData.user.projects.totalCount === 0
        ? ""
        : sourceData.user.projects.totalCount;
  }
}

// display repos
let repos = sourceData.user.repositories.nodes;
sourceData.reposContainer.innerHTML =
  "<ul>" +
  repos
    .map((repo) => {
      // date format
      let updatedDate = repo.updatedAt;
      let date = new Date(updatedDate);
      let getMonth = sourceData.monthArray[date.getMonth()];

      return `
       <li class="repo" id="repo">
            <div class="info">
                <div class="title">
                    <h3 id="name">${repo.name}</h3>
                    <span id="description">${
                      repo.description === null
                        ? ""
                        : `  <p class="repo-desc">${repo.description}</p>`
                    }</span>
                </div>
                <div class="icons">
                    ${
                      repo.primaryLanguage === null
                        ? ""
                        : `
                    <span>
                        <span class="repo-language-color" style="background-color: ${repo.primaryLanguage.color}"></span> ${repo.primaryLanguage.name}
                    </span>
                    `
                    }
                    
                    ${
                      repo.stargazerCount < 1
                        ? " "
                        : ` <span>
                                <svg aria-label="star" class="octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg> ${repo.stargazerCount}
                            </span>`
                    }

                    ${
                      repo.forkCount < 1
                        ? " "
                        : ` <span> <svg aria-label="fork" class="octicon-fork" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-repo-forked"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>${repo.forkCount} </span>`
                    }
                    ${`  <span class="date-updated">Updated on ${getMonth} ${date.getDate()}, ${date.getFullYear()}`}</span>
                </div>
            </div>
            <div class="starBtn">
                <button>
                    <svg aria-label="star" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-star">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg> Star
                </button>
            </div>
        </li>
       `;
    })
    .join("") +
  "</ul>";
