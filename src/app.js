import { http } from "./http";
import { ui } from "./ui"

document.addEventListener("DOMContentLoaded", getPosts);

//listen for add post
const askBtn = document.querySelector(".post-submit");
askBtn.addEventListener("click", addPost);

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
    }, 3000);
};

//get posts
function getPosts() {
    http
      .get("http://localhost:3001/posts")
      .then((data) => ui.showPosts(data))
      .catch((err) => console.log(err));
}

//add post
function addPost() {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#desc").value;

    const data = {
        title,
        content
    }

    http.post('http://localhost:3001/posts', data)
        .then(data => {
            if (title === "" || content === "") {
                modal("Please fill in all fields", "red", "white");
            }
            getPosts();
        })
        .catch(err => console.log(err));
}