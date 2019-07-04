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
  let firstCharacter = addTaskInput.value.charAt(0);
  let tasksParent = document.getElementById("tasks");

  // console.log(firstCharacter);

  let newTask = document.createElement("div");
  let circleDiv = document.createElement("div");
  let contentDiv = document.createElement("div");
  let taskDesc = document.createElement("div");
  let taskName = document.createElement("div");
  let expiryDiv = document.createElement("div");

  newTask.className = "the-task flex-row";
  circleDiv.className = "circle flex-row-center";
  contentDiv.className = "tasks--content flex-col";
  expiryDiv.className = "tasks--expiry";
  taskDesc.className = "task-desc";
  taskName.className = "task-name";

  tasksParent.appendChild(newTask);
  newTask.appendChild(circleDiv);
  newTask.appendChild(contentDiv);
  newTask.appendChild(expiryDiv);
  contentDiv.appendChild(taskDesc);
  contentDiv.appendChild(taskName);

  // console.log(newTask);

  circleDiv.innerText = firstCharacter;

  taskDesc.innerText = addTaskInput.value;
  taskName.innerText = descriptionInput.value;

  val = allTasksContainer;
  addTaskModal(val);
});

function addTaskModal(val) {
  newTaskContainer.classList.add("hidden");
  val.classList.remove("hidden");
}
//------------------------------------//
