class UI {
    constructor() {
        this.post = document.querySelector("#posts");
        this.titleInput = document.querySelector("#title");
        this.descArea = document.querySelector("#desc");
        this.idInput = document.querySelector("#id");
        this.postSubBtn = document.querySelector(".post-submit");
        this.formState = 'add'
    }

    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                <h4 class="card-title">${post.title}</h3>
                    <p class="card-text">${post.content}</p>
                    <a href="# class="edit card-link" data-id="${post.id}">
                    <i class="material-icons">edit</i>
                    </a>

                    <a href="# class="delete card-link" data-id="${post.id}">
                    <i class="material-icons">remove</i>
                    </a>
                </div>
            </div>`;
        })
        this.post.innerHTML = output
    }
}



export const ui = new UI();