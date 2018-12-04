//define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//lets load all event listeners at the top
loadEventListeners();
//lets define this function being called
function loadEventListeners() {
  form.addEventListener("submit", addTask);
  // remove task when user clicks 'x'
  taskList.addEventListener("click", removeTask);
  //clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  //filter through the tasks
  filter.addEventListener("keyup", filterTasks);
}

//addTask function
function addTask(e) {
  //if no task is inputed BUT user trys to submit, show alert message
  if (taskInput.value === "") {
    alert("Please add a task");
  } else {
    //now that input is not blank - add it to the UI
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append the li to the ul to display in DOM
    taskList.appendChild(li);

    //clear the input on submission
    taskInput.value = "";
  }

  // prevent the form submission behavior
  e.preventDefault();
}

//removeTask function
function removeTask(e) {
  //lets check to see if user is clicking on 'x'
  //e.target.parentElement -> look to parent element(<a></a>) to see if there is a child with the class 'delete-item' (<i></i>)
  if (e.target.parentElement.classList.contains("delete-item")) {
    //the parent of the parent is the <li> - remove entire thing when 'x' is clicked
    if (confirm("Are you sure you want to delete this Task?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  //look for all items in collection
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    //if the item matches the index of what is being filter - it will return '1', '-1' is if there is no match
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//clearTask function
function clearTasks(e) {
  taskList.innerHTML = "";
}
