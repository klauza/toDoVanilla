const storageKey = "store_todos"  //can store stirng only, so need 2 functions

//one for converting FROM the storage
const convertStringToObj = (str) => JSON.parse(str) || []; //we always want an array as return

//second for converting TO the storage
const convertObjToString = (obj) => JSON.stringify(obj) || ""; //we always want a string as return

const getTodos = () => convertStringToObj(localStorage.getItem(storageKey));

const addTodo = (todo) => localStorage.setItem(storageKey, convertObjToString([...getTodos(), todo]));

//same array minus the item we want to delete
const deleteTodo = (todo) => localStorage.setItem(storageKey, convertObjToString(getTodos().filter(_todo => _todo !== todo)));

//build an element and returns it
const buildTodoEl = (todo) => {
  const el = document.createElement("li");
  el.classList.add("list-group-item");
  el.innerText = todo;
  return el;
}

const appendLiToDom = (el) => document.getElementById("todo-list-container").appendChild(el);

const clearTodoListDisplay = () => document.getElementById("todo-list-container").innerHTML = "";

const clearInput = () => document.getElementById("new-todo-input").value = "";

const displayTodos = () => {
  clearInput();
  clearTodoListDisplay();
  getTodos().forEach(_todo => appendLiToDom(buildTodoEl(_todo)));
  initClickListeners();
}

const initClickListeners = () => {
  Array.from(document.getElementsByClassName("list-group-item")).forEach(_item => {
    _item.addEventListener("click", ($event) => {
      const todo = $event.target.innerText;
      if(window.confirm("Are you sure you want to delete this task? " + todo)){
        deleteTodo(todo);
        displayTodos();
      }
    });
  });
}

//display todos and focus input on DOM load
document.addEventListener("DOMContentLoaded", () => {
  displayTodos();
  document.getElementById("new-todo-input").focus();
})

//submit button
document.getElementById("submit-new-todo-btn").addEventListener("click", ($event) => {
  const newTodoInput = document.getElementById("new-todo-input");
  if(newTodoInput.value){
    addTodo(newTodoInput.value.trim()); //trim removes white space
    displayTodos();
  }
})

//submit button on enter hit
document.getElementById("new-todo-input").addEventListener("keyup", function($event) {
  if ($event.keyCode === 13) {
    document.getElementById("submit-new-todo-btn").click();
  }
});


//reset local storage button
document.getElementById("reset-storage-button").addEventListener("click", ($event) => {
  localStorage.removeItem(storageKey);
  displayTodos();
})