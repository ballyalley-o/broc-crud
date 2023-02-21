import { http } from "./http";
import { ui } from "./ui"

document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
    http
      .get("http://localhost:3001/posts")
      .then((data) => ui.showPosts(data))
      .catch((err) => console.log(err));
}
