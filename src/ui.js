class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.descArea = document.querySelector("#desc");
    this.idInput = document.querySelector("#id");
    this.postSubBtn = document.querySelector(".post-submit");
    this.currentAlert = document.querySelector(".modal");
    this.postChild = document.querySelectorAll(".card-child");

    this.formState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach((post) => {
      output += `
            <div class="fade card-child mb-3">
                <div class="card-body">
                    <span class="icon-container">
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="material-icons">border_color</i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="material-icons">remove</i>
                        </a>
                    </span>
                        <h3 class="card-title">${post.title}</h3>
                        <p class="card-text">${post.content}</p>
                    </div>
            </div>
            `;
    });
    this.post.innerHTML = output;
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

  clearFields() {
    this.titleInput.value = "";
    this.descArea.value = "";
  }

  clearIdInput() {
    this.idInput.value = "";
  }

  clearOldestPost() {
    //loop through the posts and remove the first post in the list and in the json-server
    if (postChild.length > 4) {
      http
        .get("http://localhost:3001/posts")
        .then((data) => data[0].id.remove())
        .catch((err) => console.log(err));
    }
  }

  fillForm(data) {
    this.titleInput.value = data.header;
    this.descArea.value = data.content;
    this.idInput.value = data.id;
    this.changeFormState("edit");
  }

  //change the form state
  changeFormState(type) {
    if (type == 'edit') {
        this.postSubBtn.textContent = 'UPDATE POST';
        this.postSubBtn.className =
          "post-submit btn btn-info btn-block postContainer";

        //add cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'post-cancel btn btn-light btn-block postContainer';
        cancelBtn.appendChild(document.createTextNode('CANCEL'));

        //get the parent
        const cardForm = document.querySelector('.card-form');
        //get the element to insert before
        const formEnd = document.querySelector('.form-end');
        //insert cancel button
        cardForm.insertBefore(cancelBtn, formEnd);

    } else {
        this.postSubBtn.textContent = 'ASK';
        this.postSubBtn.className = "post-submit btn btn-success btn-block postContainer";

        //remove cancel button
        if (document.querySelector('.post-cancel')) {
            document.querySelector('.post-cancel').remove();
        }

        //clear id from hidden field
        this.clearIdInput();
        //clear text
        this.clearFields();
    }
  }
}


export const ui = new UI();