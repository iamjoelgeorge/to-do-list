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

let tasksParent = document.querySelector("#tasks");

let firebaseRefTasks = "";
let firebaseRefNoOfTasks = "";
let taskInfo = "";
let totalNoOfTasks;

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

//HOME PAGE BUTTON WHEN CLICKED | SHOW ADD TASK FORM
function mainButtonFunc() {
  val = newTaskContainer;
  addTaskModal(val);
}
//----------------------------//

// SAVE BUTTON WHEN CLICKED | CREATE NEW TASK
function saveButtonFunc() {
  //REFERENCE FIREBASE DATABASE
  firebaseRefTasks = firebase.database().ref("tasks");
  firebaseRefNoOfTasks = firebase.database().ref("number of tasks");

  //USING EVENT DELEGATION FOR DELETION OF TASKS
  let deleteItm = document.querySelector("#tasks");
  deleteItm.addEventListener("click", deleteItem);

  //HIDE NEW TASK CONTAINER
  val = allTasksContainer;
  addTaskModal(val);

  // PUSH DATA TO THE DATABASE
  insertToDatabase(
    addTaskInput.value,
    descriptionInput.value,
    date.value,
    time.value
  );

  //RETRIEVE DATA FROM THE DATABASE
  firebaseRefTasks.on("value", gotData, noData);
}

//DELETE TASKS
function deleteItem(e) {
  firebaseRefTasks = firebase.database().ref("tasks");

  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
    noOfTasks--;
    noOfTasksRemaining(noOfTasks);
  }

  firebaseRefTasks.on("value", gotData, noData);
}
//----------------------------------------//

//PUSH DATA TO THE DATABASE
function insertToDatabase(name, description, date, time) {
  taskInfo = {
    name: name,
    description: description,
    date: date,
    time: time
  };

  firebaseRefTasks.push(taskInfo);
  // firebaseRefNoOfTasks.set(totalNoOfTasks);
}
/////////////////////////////////////////////////////
//RETRIEVE DATA FROM THE DATABASE
function gotData(data) {
  let clearWindowBeforeLoad = document.querySelectorAll(".the-task");

  for (let i = 0; i < clearWindowBeforeLoad.length; i++) {
    clearWindowBeforeLoad[i].remove();
  }

  taskInfoReceived = data.val();
  //GETTING THE UNIQUE KEYS OF EACH OBJECT IN AN ARRAY
  let keys = Object.keys(taskInfoReceived);
  // console.log(keys);

  //ITERATING THROUGH THE ARRAY
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    // console.log(k);
    let nameReceived = taskInfoReceived[k].name;
    let descriptionReceived = taskInfoReceived[k].description;
    let dateReceived = taskInfoReceived[k].date;
    let timeReceived = taskInfoReceived[k].time;
    let display = document.getElementById("display");

    let firstCharacter = nameReceived.charAt(0);

    //CREATING ELEMENTS FOR THE NEW TASK
    let newTask = document.createElement("div");
    let circleDiv = document.createElement("div");
    let contentDiv = document.createElement("div");
    let taskDesc = document.createElement("div");
    let taskName = document.createElement("div");
    let expiryDiv = document.createElement("div");
    let closeButton = document.createElement("a");

    closeButton.innerText = "x";

    // console.log(newTask);

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
    contentDiv.appendChild(taskName);
    contentDiv.appendChild(taskDesc);

    circleDiv.innerText = firstCharacter;
    taskName.innerText = nameReceived;
    taskDesc.innerText = descriptionReceived;

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
        // continue;
      }
    }, 1000);

    let noOfTasks = tasksParent.childNodes.length;
    noOfTasksRemaining(noOfTasks);
  }
}
///////////////////////////////////////////////////
function noData(data) {
  alert("No data in the database");
}

//HIDE AND SHOW ELEMENTS
function addTaskModal(val) {
  newTaskContainer.classList.add("hidden");
  val.classList.remove("hidden");
}
//------------------------------------//

//DYNAMIC UPDATION OF THE NUMBER OF TASKS REMAINING
function noOfTasksRemaining(noOfTasks) {
  // var noOfTasks = tasksParent.childNodes.length - 1;
  if (noOfTasks > 0) {
    if (noOfTasks == 1) {
      itemsLeft.innerText = "1 Task Remaining";
    } else {
      itemsLeft.innerText = `${noOfTasks} Tasks Remaining`;
    }
  } else {
    itemsLeft.innerText = "No items left";
  }
}
