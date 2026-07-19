let tasks = getTasks();

let editingTaskId=null;

const addTaskBtn = document.getElementById("addTaskBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskStatus=document.getElementById("taskStatus");
const taskDueDate = document.getElementById("taskDueDate");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priorityFilter = document.getElementById("priorityFilter");

const todoTasks = document.getElementById("todoTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const doneTasks = document.getElementById("doneTasks");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progressTasks = document.getElementById("progressTasks");
const overdueTasks = document.getElementById("overdueTasks");
const highPriorityTasks = document.getElementById("highPriorityTasks");

addTaskBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
saveTaskBtn.addEventListener("click", addTask);

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
priorityFilter.addEventListener("change", applyFilters);

function addTask() {

    if (taskTitle.value.trim() === "") {
        alert("Task title is required");
        return;
    }

    if (taskDescription.value.trim() === "") {
        alert("Task description is required");
        return;
    }

    if (taskDueDate.value === "") {
        alert("Due date is required");
        return;
    }



    const today = new Date();
    today.setHours(0,0,0,0);

    const selectedDate = new Date(taskDueDate.value);

    if(selectedDate < today){
        alert("Invalid date");
        return;
    }

    const newTask = {

        id: Date.now(),
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim(),
        category: taskCategory.value,
        priority: taskPriority.value,
        status:taskStatus.value,
        dueDate: taskDueDate.value,
        completed:false

    };

    if(editingTaskId !==null){
        const task=tasks.find(task=> task.id===editingTaskId);

          task.title = taskTitle.value.trim();
          task.description = taskDescription.value.trim();
          task.category = taskCategory.value;
          task.priority = taskPriority.value;
          task.dueDate = taskDueDate.value;

          editingTaskId=null;
    }else{
        tasks.push(newTask);
    }

   

    saveTasks(tasks);

    renderTasks();

    updateStatistics();

    closeModal();

    clearInputs();

}

function clearInputs(){

    taskTitle.value = "";
    taskDescription.value = "";
    taskCategory.value = "study";
    taskPriority.value = "high";
    taskStatus.value="to do";
    taskDueDate.value = "";

}

function renderTasks(taskList = tasks){

    todoTasks.innerHTML = "";
    inProgressTasks.innerHTML = "";
    doneTasks.innerHTML = "";

    taskList.forEach(task=>{

        const taskCard = document.createElement("div");

        taskCard.className = "task-card";

        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Category: ${task.category}</p>
            <p>Priority: ${task.priority}</p>
            <p>Due Date: ${task.dueDate}</p>

            <button onclick="editTask(${task.id})">
                 Edit
            </button>


            <button onclick="completeTask(${task.id})">
                Done
            </button>

            

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

      if(task.status === "todo"){

    todoTasks.appendChild(taskCard);

}
else if(task.status === "progress"){

    inProgressTasks.appendChild(taskCard);

}
else if(task.status === "done"){

    doneTasks.appendChild(taskCard);

}

    });

}


function editTask(id){
    const task=tasks.find(task=> task.id===id);
    
    if(!task){
        return;
    }

    editingTaskId=id;
    taskTitle.value=task.title;
    taskDescription.value=task.description;
    taskCategory.value=task.category;
    taskPriority.value=task.priority;
    taskDueDate.value=task.dueDate;

    openModal();
}

function completeTask(id){

    const task = tasks.find(task => task.id === id);

    if(task){
        
        task.status="done";

        task.completed = true;

        saveTasks(tasks);

        renderTasks();

        updateStatistics();

    }

}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks(tasks);

    renderTasks();

    updateStatistics();

}

function updateStatistics(){

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = tasks.filter(task => task.completed).length;

    progressTasks.textContent = tasks.filter(task => !task.completed).length;

    highPriorityTasks.textContent = tasks.filter(task => task.priority === "high").length;

    const today = new Date();
    today.setHours(0,0,0,0);

    overdueTasks.textContent = tasks.filter(task => {

        const due = new Date(task.dueDate);

        return due < today && !task.completed;

    }).length;

}

function applyFilters(){

    const searchValue = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const selectedPriority = priorityFilter.value;

    let filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchValue)
    );

    if(selectedCategory !== "all"){

        filteredTasks = filteredTasks.filter(task =>
            task.category === selectedCategory
        );

    }

    if(selectedPriority !== "all"){

        filteredTasks = filteredTasks.filter(task =>
            task.priority === selectedPriority
        );

    }

    renderTasks(filteredTasks);

}

renderTasks();

updateStatistics();