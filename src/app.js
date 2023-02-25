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
    addPost()
});

//listen for cancel
const cancelBtn = document.querySelector(".card-form")
cancelBtn.addEventListener("click", cancelEditeState);

//listen for edit state
document.querySelector("#posts").addEventListener("click", toggleEdit);


//Method GET
function getPosts() {
    http
      .get("http://localhost:3001/posts")
      .then((data) => ui.showPosts(data))
      .catch((err) => console.log(err));
}

//Method DELETExw
function deletePost(e) {
    e.preventDefault();
    const titleTarget = e.target.parentElement.parentElement.nextElementSibling.textContent;

    if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;

    if (confirm("Are you sure?")) {
        http
          .delete(`http://localhost:3001/posts/${id}`)
          .then(data => {
            ui.modal("Post Deleted", "red", "white");
            console.log(`Post "${titleTarget}" deleted`);
            getPosts();
          })
          .catch((err) => console.log(err));
    }
  }
}

//Method PUT
function toggleEdit(e) {
    if (e.target.parentElement.classList.contains("edit")) {

    const id = e.target.parentElement.dataset.id;
    const header = e.target.parentElement.parentElement.nextElementSibling.textContent;

    const content = e.target.parentElement.parentElement.nextElementSibling
        .nextElementSibling.textContent;

    const data = {
        id,
        header,
        content
    }
    //fill form with current post
    ui.fillForm(data);
    }
  e.preventDefault();
}

//cancel edit state
function cancelEditeState(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}

//add post
function addPost() {
  let title = document.querySelector("#title").value;
  let content = document.querySelector("#desc").value;
  let id = document.querySelector("#id").value;

    const data = {
        title,
        content
    }

    if (id === "") {
        //create post
        http.post("http://localhost:3001/posts", data)
          .then(data => {
            ui.modal("Post Added", "green", "white");
            setTimeout(() => {
              location.reload();
            }, 1000);
            ui.clearFields();
            getPosts();
          })
          .catch((err) => console.log(err));
    }
    else {
        http.put(`http://localhost:3001/posts/${id}`, data)
          .then(data => {
            ui.modal("Post Updated", "#708AF0", "white");
            setTimeout(() => {
              location.reload();
            }, 1000);
            ui.changeFormState("add");
            getPosts();
          })
          .catch((err) => console.log(err));
    }

}