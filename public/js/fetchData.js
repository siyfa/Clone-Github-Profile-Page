import { apiKey } from "./api.js";

//Source data
const source = {
  token: ${secrets.SECRET_TOKEN},
  url: "https://api.github.com/graphql",
  inputUser: document.getElementById("input"),
};
//Set-up fetch header
const header = {
  "Content-Type": "application/json;charset=UTF-8",
  Authorization: "bearer " + source.token,
};

document.querySelector(".indexButton").addEventListener("click", async () => {
  const username = source.inputUser.value;
  const message = document.getElementById("warning");
  try {
    // checking input field
    if (username.length < 1) {
      message.textContent = "Enter a username";
    } else if (username.length < 3) {
      message.textContent = "Word too short";
    } else {
      message.style.display = "none";
      // Getting repositories

      //GraphQl Data Model
      let queryData = {
        query: `
            query {
                user(login: "${username}"){
                avatarUrl
            login
            name
            bio
            projects {
                totalCount
            }
            repositories(first: 20) {
                totalCount
                nodes {
                    name
                    forkCount
                    stargazerCount
                    updatedAt
                    description
                    isFork
                    url
                    primaryLanguage{
                        color
                        name
                    }
                    }
                }
            }
            }
            `,
      };

      // fetching data
      await fetch(source.url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(queryData),
      })
        .then((res) => res.json())
        .then((data) => {
          let userData = data.data.user;
          window.localStorage.setItem("user", JSON.stringify(userData));
          console.log(userData);
          // Rendering the profile page to the user
          render();
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
});

// Searching a user function
// async function getRepo() {
//   const username = source.inputUser.value;
//   const message = document.getElementById("warning");
//   try {
//     // checking input field
//     if (username.length < 1) {
//       message.textContent = "Enter a username";
//     } else if (username.length < 3) {
//       message.textContent = "Word too short";
//     } else {
//       message.style.display = "none";
//       // Getting repositories

//       //GraphQl Data Model
//       queryData = {
//         query: `
//             query {
//                 user(login: "${username}"){
//                 avatarUrl
//             login
//             name
//             bio
//             projects {
//                 totalCount
//             }
//             repositories(first: 20) {
//                 totalCount
//                 nodes {
//                     name
//                     forkCount
//                     stargazerCount
//                     updatedAt
//                     description
//                     isFork
//                     url
//                     primaryLanguage{
//                         color
//                         name
//                     }
//                     }
//                 }
//             }
//             }
//             `,
//       };

//       // fetching data
//       await fetch(source.url, {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(queryData),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           userData = data.data.user;
//           window.localStorage.setItem("user", JSON.stringify(userData));
//           console.log(userData);
//           // Rendering the profile page to the user
//           render();
//         })
//         .catch((err) => console.log(err));
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

function render() {
  var loadPage = document.createElement("a");
  loadPage.id = "page";
  loadPage.href = "profilepage.html";
  document.body.appendChild(loadPage);
  document.getElementById("page").click();
}

// Babel can be install to enable es6 export and import feautures in this project, but since it is not use, following codes will be written below
