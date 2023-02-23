import { http } from "./http";
import { ui } from "./ui"

let title = document.querySelector("#title")
let desc = document.querySelector("#desc")

document.addEventListener("DOMContentLoaded", getPosts);
document.querySelector("#posts").addEventListener("click", deletePost);

//listen for add post
const askBtn = document.querySelector(".post-submit");
askBtn.addEventListener("click", () => {
    if (title.value === "" || desc.value === "") {
        modal("Please fill in all empty fields", "red", "white");
        return;
    }
    addPost();
});

const modal = (msg, bgColor, color) => {
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-title");
    const modalBGColor = document.querySelector(".modal-content");
    const modalDeleteIcon = document.querySelector(".delete");

    modal.style.display = "block";
    modalContent.innerHTML = msg;
    modalBGColor.style.backgroundColor = bgColor;
    modalDeleteIcon.style.color = color;

    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
};



//Method GET
function getPosts() {
    http
      .get("http://localhost:3001/posts")
      .then((data) => ui.showPosts(data))
      .catch((err) => console.log(err));
}

//Method POST
function createPost() {
    http
      .get("http://localhost:3001/posts")
      .then((data) => ui.showPosts(data))
      .catch((err) => console.log(err));
}

//Method DELETE
function deletePost(e) {



  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;

    if (confirm("Are you sure?")) {
        http
          .delete(`http://localhost:3001/posts/${id}`)
          .then((data) => {
            console.log(data);
            ui.modal("Post Deleted", "red", "white");
            getPosts();
          })
          .catch((err) => console.log(err));
    }
  }
  e.preventDefault();
}

function clearAlert() {
    const currentAlert = document.querySelector(".modal");

    if (currentAlert) {
        currentAlert.remove();
    }
}

function clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#desc").value = "";
}

//create a function that clear the oldest post when a new post was added
function clearOldestPost() {
    //loop through the posts and remove the first post in the list and in the json-server
    const posts = document.querySelectorAll(".card-child");
    if (posts.length > 4) {
        http
          .get("http://localhost:3001/posts")
          .then((data) => data)
          .catch((err) => console.log(err));
    }
}

//add post
function addPost() {
  let title = document.querySelector("#title").value;
  let content = document.querySelector("#desc").value;

    const data = {
        title,
        content
    }

    http.post('http://localhost:3001/posts', data)
        .then(data => {
            modal("Post Added", "green", "white")
            clearFields();
            clearOldestPost();
            getPosts();
        })
        .catch(err => console.log(err));
}