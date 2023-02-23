import { http } from "./http";
import { ui } from "./ui"

let title = document.querySelector("#title")
let desc = document.querySelector("#desc")

//get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
//listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);
//listen for add post
const askBtn = document.querySelector(".post-submit");
askBtn.addEventListener("click", () => {
    if (title.value === "" || desc.value === "") {
        ui.modal("Please fill in all empty fields", "red", "white");
        return;
    }
    addPost();
});

//Method GET
function getPosts() {
    http
      .get("http://localhost:3001/posts")
      .then((data) => ui.showPosts(data))
      .catch((err) => console.log(err));
}

//Method DELETE
function deletePost(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;

    if (confirm("Are you sure?")) {
        http
          .delete(`http://localhost:3001/posts/${id}`)
          .then(data => {
            ui.modal("Post Deleted", "red", "white");
            console.log(data);
            getPosts();
          })
          .catch((err) => console.log(err));
    }
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
    http
        .post('http://localhost:3001/posts', data)
        .then(data => {
            ui.modal("Post Added", "green", "white")
            ui.clearFields();
            ui.clearOldestPost();
            getPosts();
        })
        .catch(err => console.log(err));
}