let tasks = getTasks();

let editingTaskId = null;

let draggedTaskId = null;

let presetStatus = "todo";

const addTaskBtn = document.getElementById("addTaskBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModalBtn2 = document.getElementById("closeModalBtn2");


const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskStatus = document.getElementById("taskStatus");
const taskDueDate = document.getElementById("taskDueDate");
const taskAssignee = document.getElementById("taskAssignee");


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

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("progressCount");
const doneCount = document.getElementById("doneCount");


// Details Modal

const detailsModal = document.getElementById("detailsModal");

const closeDetailsModal = document.getElementById("closeDetailsModal");

const detailsTitle = document.getElementById("detailsTitle");

const detailsDescription = document.getElementById("detailsDescription");

const detailsCategory = document.getElementById("detailsCategory");

const detailsPriority = document.getElementById("detailsPriority");

const detailsStatus = document.getElementById("detailsStatus");

const detailsDate = document.getElementById("detailsDate");

const detailsAssignee = document.getElementById("detailsAssignee");



addTaskBtn.addEventListener("click", () => {

    editingTaskId = null;

    clearInputs();

    taskStatus.value = "todo";

    openModal();

});

closeModalBtn.addEventListener("click", closeModal);

closeModalBtn2.addEventListener("click", closeModal);

saveTaskBtn.addEventListener("click", addTask);


searchInput.addEventListener("input", applyFilters);

categoryFilter.addEventListener("change", applyFilters);

priorityFilter.addEventListener("change", applyFilters);


closeDetailsModal.addEventListener("click", closeDetails);


document.querySelectorAll(".column").forEach(column => {

    column.addEventListener("dragover", (e) => {

        e.preventDefault();

        column.classList.add("drag-over");

    });

    column.addEventListener("dragleave", () => {

        column.classList.remove("drag-over");

    });

    column.addEventListener("drop", (e) => {

        e.preventDefault();

        column.classList.remove("drag-over");

        if(draggedTaskId !== null){

            changeStatus(draggedTaskId, column.dataset.status);

            draggedTaskId = null;

        }

    });

});




function addTask(){


    if(taskTitle.value.trim() === ""){

        alert("Task title is required");
        return;

    }


    if(taskDescription.value.trim() === ""){

        alert("Task description is required");
        return;

    }


    if(taskDueDate.value === ""){

        alert("Due date is required");
        return;

    }



    const newTask = {

        id: Date.now(),

        title: taskTitle.value.trim(),

        description: taskDescription.value.trim(),

        category: taskCategory.value,

        priority: taskPriority.value,

        status: taskStatus.value,

        dueDate: taskDueDate.value,

        assignee: taskAssignee.value.trim() || "Alex Rivera",

        completed: taskStatus.value === "done"

    };



    if(editingTaskId !== null){


        const task = tasks.find(
            task => task.id === editingTaskId
        );


        task.title = taskTitle.value.trim();

        task.description = taskDescription.value.trim();

        task.category = taskCategory.value;

        task.priority = taskPriority.value;

        task.status = taskStatus.value;

        task.dueDate = taskDueDate.value;

        task.assignee = taskAssignee.value.trim() || "Alex Rivera";

        task.completed = taskStatus.value === "done";


        editingTaskId = null;


    }
    else{


        tasks.push(newTask);


    }



    saveTasks(tasks);

    renderTasks();

    updateStatistics();

    closeModal();

    clearInputs();


}






function editTask(id){

    const task = tasks.find(task => task.id === id);

    if(!task){
        return;
    }



    editingTaskId = id;


    taskTitle.value = task.title;
    taskDescription.value = task.description;

    taskCategory.value = task.category;
    taskPriority.value = task.priority;

    taskStatus.value = task.status;
    taskDueDate.value = task.dueDate;

    taskAssignee.value = task.assignee || "";

    openModal();

}






function clearInputs(){

    taskTitle.value = "";

    taskDescription.value = "";
    taskCategory.value = "study";

    taskPriority.value = "high";

    taskStatus.value = "todo";
    taskDueDate.value = "";

    taskAssignee.value = "";


}



function getInitials(name){

    if(!name){
        return "?";
    }

    const parts = name.trim().split(" ").filter(Boolean);

    if(parts.length === 1){
        return parts[0].substring(0,2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();

}



function categoryTagClass(category){

    if(category === "study"){
        return "tag--study";
    }

    if(category === "work"){
        return "tag--work";
    }

    return "tag--default";

}



function priorityBadgeClass(priority){

    if(priority === "high"){
        return "badge--high";
    }

    if(priority === "medium"){
        return "badge--medium";
    }

    return "badge--low";

}



function formatDueDate(dueDate){

    if(!dueDate){
        return "No date";
    }

    const date = new Date(dueDate);

    return date.toLocaleDateString("en-US",{month:"short",day:"numeric"});

}




function renderTasks(taskList = tasks){


    todoTasks.innerHTML = "";

    inProgressTasks.innerHTML = "";

    doneTasks.innerHTML = "";



    taskList.forEach(task => {


        const taskCard = document.createElement("div");


        taskCard.className = "task-card";

        taskCard.setAttribute("draggable","true");

        taskCard.dataset.id = task.id;



        taskCard.innerHTML = `


        <div class="task-card-top">

            <span class="tag ${categoryTagClass(task.category)}">${task.category}</span>

            <span class="badge ${priorityBadgeClass(task.priority)}">${task.priority}</span>

        </div>


        <div onclick="showTaskDetails(${task.id})">

            <h3>${task.title}</h3>

            <p class="task-desc">${task.description}</p>

        </div>


        <div class="task-card-footer">

            <span class="due-date">📅 ${formatDueDate(task.dueDate)}</span>

            <span class="avatar" style="width:26px;height:26px;font-size:11px;" title="${task.assignee || "Unassigned"}">${getInitials(task.assignee)}</span>

        </div>


        <select onchange="changeStatus(${task.id},this.value)">

            <option value="todo" 
            ${task.status==="todo"?"selected":""}>
                To Do
            </option>


            <option value="progress"
            ${task.status==="progress"?"selected":""}>
                In Progress
            </option>


            <option value="done"
            ${task.status==="done"?"selected":""}>
                Done
            </option>


        </select>


        <div class="task-actions">

            <button onclick="editTask(${task.id})">✎</button>

            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>

        </div>


        `;



        taskCard.addEventListener("dragstart", () => {

            draggedTaskId = task.id;

            taskCard.classList.add("dragging");

        });

        taskCard.addEventListener("dragend", () => {

            taskCard.classList.remove("dragging");

        });



        if(task.status === "todo"){

            todoTasks.appendChild(taskCard);

        }
        else if(task.status === "progress"){

            inProgressTasks.appendChild(taskCard);

        }
        else{

            doneTasks.appendChild(taskCard);

        }


    });


    todoCount.textContent = todoTasks.children.length;

    progressCount.textContent = inProgressTasks.children.length;

    doneCount.textContent = doneTasks.children.length;


}








function changeStatus(id,status){


    const task = tasks.find(
        task => task.id === id
    );


    if(task){


        task.status = status;

        task.completed = status === "done";


        saveTasks(tasks);

        renderTasks();

        updateStatistics();


    }


}







function deleteTask(id){


    tasks = tasks.filter(
        task => task.id !== id
    );


    saveTasks(tasks);


    renderTasks();

    updateStatistics();


}







function updateStatistics(){


    totalTasks.textContent = tasks.length;


    completedTasks.textContent =
    tasks.filter(task =>
        task.status === "done"
    ).length;



    progressTasks.textContent =
    tasks.filter(task =>
        task.status === "progress"
    ).length;



    highPriorityTasks.textContent =
    tasks.filter(task =>
        task.priority === "high"
    ).length;




    const today = new Date();

    today.setHours(0,0,0,0);



    overdueTasks.textContent =
    tasks.filter(task => {


        const due = new Date(task.dueDate);


        return due < today &&
        task.status !== "done";


    }).length;



}








function applyFilters(){


    const searchValue =
    searchInput.value.toLowerCase();


    const category =
    categoryFilter.value;


    const priority =
    priorityFilter.value;



    let filteredTasks =
    tasks.filter(task =>

        task.title
        .toLowerCase()
        .includes(searchValue)

    );



    if(category !== "all"){


        filteredTasks =
        filteredTasks.filter(task =>
            task.category === category
        );


    }



    if(priority !== "all"){


        filteredTasks =
        filteredTasks.filter(task =>
            task.priority === priority
        );


    }



    renderTasks(filteredTasks);


}







function showTaskDetails(id){


    const task =
    tasks.find(task => task.id === id);



    if(!task){
        return;
    }



    detailsTitle.textContent = task.title;

    detailsDescription.textContent = task.description;

    detailsCategory.textContent = task.category;

    detailsCategory.className = "tag " + categoryTagClass(task.category);

    detailsPriority.textContent = task.priority;

    detailsPriority.className = "badge " + priorityBadgeClass(task.priority);

    detailsStatus.textContent = task.status;

    detailsDate.textContent = task.dueDate;

    detailsAssignee.textContent = task.assignee || "Unassigned";



    detailsModal.style.display = "flex";


}






function closeDetails(){

    detailsModal.style.display = "none";

}





renderTasks();

updateStatistics();