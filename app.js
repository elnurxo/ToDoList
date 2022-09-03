const addBtn = document.getElementById("add-button");
const updateBtn = document.getElementById("update-button");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let currentUpdateElement;
addBtn.disabled = true;

const checkButtons = () => {
    if (todoInput.value == "") {
      updateBtn.disabled = true;
      addBtn.disabled = true;
    }
  };
const resetBtn = () => {
  addBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
};

todoInput.addEventListener("keyup", function(e) {
  addBtn.disabled = e.target.value ? false : true;
  updateBtn.disabled = e.target.value ? false : true;
});

addBtn.addEventListener("click", () => {
  const liElement = document.createElement("li");
  const headingElement = document.createElement("h2");
  const deleteButtonElement = document.createElement("button");
  const editButtonElement = document.createElement("button");

  headingElement.textContent = todoInput.value;

  deleteButtonElement.textContent = "X";
  deleteButtonElement.className = "delete-button";

  deleteButtonElement.addEventListener("click", () => {
    checkButtons();
    if (currentUpdateElement === liElement) {
      resetBtn();
      todoInput.value = "";
      currentUpdateElement = undefined;
    }
    todoList.removeChild(liElement);
  });

  editButtonElement.textContent = "Edit";
  editButtonElement.className = "edit-button";

  editButtonElement.addEventListener("click", () => {
    if (currentUpdateElement && editButtonElement.textContent == "Edit") {
      return;
    }
    if (editButtonElement.textContent == "Edit") {
      checkButtons();
      editButtonElement.textContent = "Close Edit";
      todoInput.value = headingElement.textContent;
      addBtn.style.display = "none";
      updateBtn.style.display = "inline-block";
      currentUpdateElement = liElement;
    } else {
      checkButtons();
      resetBtn();
      editButtonElement.textContent = "Edit";
      todoInput.value = "";
      currentUpdateElement = undefined;
    }
  });

  liElement.append(headingElement,editButtonElement,deleteButtonElement);
  todoList.prepend(liElement);
  todoInput.value = "";
  addBtn.disabled = true;
});

updateBtn.addEventListener("click", () => {
  currentUpdateElement.children[0].textContent = todoInput.value;
  currentUpdateElement.children[1].textContent = "Edit";
  updateBtn.disabled = true;
  addBtn.disabled = true;
  currentUpdateElement = undefined;
  todoInput.value = "";
  resetBtn();
});


