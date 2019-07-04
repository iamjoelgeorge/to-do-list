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
  let taskDesc = document.querySelector(".task-desc");
  let taskName = document.querySelector(".task-name");
  let taskLetter = document.querySelector(".circle");
  let firstCharacter = addTaskInput.value.charAt(0);

  // console.log(firstCharacter);

  taskLetter.innerText = firstCharacter;

  taskDesc.innerText = addTaskInput.value;
  taskName.innerText = descriptionInput.value;

  console.log(addTaskInput.value);
  console.log(descriptionInput.value);
  console.log(date.value);
  console.log(time.value);
  val = allTasksContainer;
  addTaskModal(val);
});

function addTaskModal(val) {
  newTaskContainer.classList.add("hidden");
  val.classList.remove("hidden");
}
//------------------------------------//
