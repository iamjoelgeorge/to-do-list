let dropdownList = document.querySelector("#dropdown-list");
let newTaskContainer = document.querySelector("#new-task-container");
let allTasksContainer = document.querySelector("#all-tasks-container");
let val;

let mainButton = document.querySelector("#btn--main");
let saveButton = document.querySelector("#save-btn");

let addTaskInput = document.querySelector("#add-task");
let descriptionInput = document.querySelector("#description");
let date = document.querySelector("#date");
let time = document.querySelector("#time");
let radioPersonal = document.querySelector("#personal");
let radioBusiness = document.querySelector("#business");
let radioOther = document.querySelector("#other");

//Close New Task Container (Modal)
document.onkeydown = function(evt) {
  if (evt.keyCode === 27) {
    document.querySelector("#new-task-container").classList.add("hidden");
    evt.preventDefault();
  }
};
//------------------------------------//
mainButton.addEventListener("click", function() {
  val = newTaskContainer;
  addTaskModal(val);
});

saveButton.addEventListener("click", function(e) {
  console.log("Hi");
  val = allTasksContainer;
  addTaskModal(val);
});

function addTaskModal(val) {
  newTaskContainer.classList.add("hidden");
  val.classList.remove("hidden");
}
