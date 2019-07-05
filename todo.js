let dropdownList = document.querySelector("#dropdown-list");
let newTaskContainer = document.querySelector("#new-task-container");
let allTasksContainer = document.querySelector("#all-tasks-container");
let itemsLeft = document.querySelector("#items-left");
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

let tasksParent = document.getElementById("tasks");

//CLOSE NEW TASK CONTAINER WITH ESC BUTTON (Modal)
document.onkeydown = function(evt) {
  if (evt.keyCode === 27) {
    document.querySelector("#new-task-container").classList.add("hidden");
    evt.preventDefault();
  }
};
//----------------------------------------------//
mainButton.addEventListener("click", mainButtonFunc);
saveButton.addEventListener("click", saveButtonFunc);
//----------------------------------------------//

//HOME PAGE BUTTON WHEN CLICKED
function mainButtonFunc() {
  val = newTaskContainer;
  addTaskModal(val);
}
//----------------------------//

// SAVE BUTTON WHEN CLICKED
function saveButtonFunc() {
  let firstCharacter = addTaskInput.value.charAt(0);

  //CREATING ELEMENTS FOR THE NEW TASK
  let newTask = document.createElement("div");
  let circleDiv = document.createElement("div");
  let contentDiv = document.createElement("div");
  let taskDesc = document.createElement("div");
  let taskName = document.createElement("div");
  let expiryDiv = document.createElement("div");
  let closeButton = document.createElement("a");

  closeButton.innerText = "x";

  console.log(newTask);

  newTask.className = "the-task flex-row";
  circleDiv.className = "circle flex-row-center";
  contentDiv.className = "tasks--content flex-col";
  expiryDiv.className = "tasks--expiry";
  taskDesc.className = "task-desc";
  taskName.className = "task-name";
  closeButton.className = "close";

  closeButton.setAttribute("href", "#");

  tasksParent.appendChild(newTask);
  newTask.appendChild(circleDiv);
  newTask.appendChild(contentDiv);
  newTask.appendChild(expiryDiv);
  newTask.appendChild(closeButton);
  contentDiv.appendChild(taskDesc);
  contentDiv.appendChild(taskName);

  circleDiv.innerText = firstCharacter;
  taskDesc.innerText = addTaskInput.value;
  taskName.innerText = descriptionInput.value;

  //COUNTDOWN TIMER
  let endDate = new Date(`${date.value} ${time.value}`).getTime();
  let timer = setInterval(function() {
    let now = new Date().getTime();
    let t = endDate - now;

    if (t >= 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);
      expiryDiv.innerText = `${days} Day(s) ${hours} Hour(s) ${mins} Min(s) ${secs} Sec(s)`;
    } else {
      expiryDiv.innerText = "GET GOING! NOW!";
    }
  }, 1000);

  //DYNAMIC UPDATION OF THE NUMBER OF TASKS REMAINING
  let noOfTasks = tasksParent.childNodes.length;
  if (noOfTasks > 0) {
    if (noOfTasks == 1) {
      itemsLeft.innerText = "1 Task Remaining";
    } else {
      itemsLeft.innerText = `${noOfTasks} Tasks Remaining`;
    }
  } else {
    itemsLeft.innerText = "No items left";
  }

  val = allTasksContainer;
  addTaskModal(val);
}
//----------------------------------------//

//HIDE AND SHOW ELEMENTS
function addTaskModal(val) {
  newTaskContainer.classList.add("hidden");
  val.classList.remove("hidden");
}
//------------------------------------//
