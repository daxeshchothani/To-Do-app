document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const clearBtn = document.getElementById("clear-btn");
  const todoList = document.getElementById("todo-list");

  // Load todo items from local storage
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todoText) => addTodoItem(todoText));


  // add buton
  addBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      saveTodoToLocalStorage(todoText);
      todoInput.value = "";
    }
  });
  // clear buton
  clearBtn.addEventListener("click", function () {
    todoList.innerHTML = "";
    localStorage.removeItem("todos");
  });
  // add data to table
  function addTodoItem(todoText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${todoText}</span>
        <button class="update-btn">Update</button>
        <button class="delete-btn">Delete</button>
      `;
    todoList.appendChild(li);
  }

  todoList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const li = event.target.parentNode;
      const todoText = li.querySelector("span").textContent;
      li.remove();
      removeTodoFromLocalStorage(todoText);
    } else if (event.target.classList.contains("update-btn")) {
      const li = event.target.parentNode;
      const todoText = li.querySelector("span").textContent;
      const newText = prompt("Enter updated text:", todoText);
      if (newText !== null && newText.trim() !== "") {
        li.querySelector("span").textContent = newText.trim();
        updateTodoInLocalStorage(todoText, newText.trim());
      }
    }
  });
  // Sava data in local
  function saveTodoToLocalStorage(todoText) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // remove data from local
  function removeTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let updatedTodos = [];
    for (let i = 0; i < todos.length; i++) {
        if (todos[i] !== todoText) {
            updatedTodos.push(todos[i]);
        }
    }
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}


  function updateTodoInLocalStorage(oldText, newText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const index = todos.indexOf(oldText);
    if (index !== -1) {
      todos[index] = newText;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
});
//what is local storage?
//how can we strote data in loclstrorage in array form 
// how can we retrive data from local strorage
