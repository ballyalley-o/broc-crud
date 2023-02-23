class UI {
    constructor() {
        this.post = document.querySelector("#posts");
        this.titleInput = document.querySelector("#title");
        this.descArea = document.querySelector("#desc");
        this.idInput = document.querySelector("#id");
        this.postSubBtn = document.querySelector(".post-submit");
        this.currentAlert = document.querySelector(".modal");
        this.postChild = document.querySelectorAll(".card-child");
        this.formState = 'add'
    }

    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
            <div class="card-child mb-3">
                <div class="card-body">
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="material-icons">border_color</i>
                            </a>
                                <a href="#" class="delete card-link" data-id="${post.id}">
                                    <i class="material-icons">remove</i>
                                </a>
                            <h3 class="card-title">${post.title}</h3>
                            <p class="card-text">${post.content}</p>
                    </div>
            </div>
            `;
        })
        this.post.innerHTML = output
    }


    modal(msg, bgColor, color) {
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
    }

    clearAlert() {
      if (currentAlert) {
        currentAlert.remove();
      }
    }

    clearFields() {
      titleInput.value = "";
      descArea.value = "";
    }

    clearOldestPost() {
    //loop through the posts and remove the first post in the list and in the json-server
    if (postChild.length > 4) {
        http
          .get("http://localhost:3001/posts")
          .then(data => data[0].id.remove())
          .catch((err) => console.log(err));
    }
}

}

export const ui = new UI();