let tasks = getTasks();

let editingTaskId = null;


const addTaskBtn = document.getElementById("addTaskBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");


const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskStatus = document.getElementById("taskStatus");
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


// Details Modal

const detailsModal = document.getElementById("detailsModal");

const closeDetailsModal = document.getElementById("closeDetailsModal");

const detailsTitle = document.getElementById("detailsTitle");

const detailsDescription = document.getElementById("detailsDescription");

const detailsCategory = document.getElementById("detailsCategory");

const detailsPriority = document.getElementById("detailsPriority");

const detailsStatus = document.getElementById("detailsStatus");

const detailsDate = document.getElementById("detailsDate");



addTaskBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

saveTaskBtn.addEventListener("click", addTask);


searchInput.addEventListener("input", applyFilters);

categoryFilter.addEventListener("change", applyFilters);

priorityFilter.addEventListener("change", applyFilters);


closeDetailsModal.addEventListener("click", closeDetails);





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


    const task = tasks.find(
        task => task.id === id
    );


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



    openModal();

}






function clearInputs(){


    taskTitle.value = "";

    taskDescription.value = "";

    taskCategory.value = "study";

    taskPriority.value = "high";

    taskStatus.value = "todo";

    taskDueDate.value = "";


}







function renderTasks(taskList = tasks){


    todoTasks.innerHTML = "";

    inProgressTasks.innerHTML = "";

    doneTasks.innerHTML = "";



    taskList.forEach(task => {


        const taskCard = document.createElement("div");


        taskCard.className = "task-card";



        taskCard.innerHTML = `


        <div onclick="showTaskDetails(${task.id})">


            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <p>
                Category: ${task.category}
            </p>

            <p>
                Priority: ${task.priority}
            </p>

            <p>
                Due Date: ${task.dueDate}
            </p>


        </div>



        <button onclick="editTask(${task.id})">
            Edit
        </button>



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
        else{

            doneTasks.appendChild(taskCard);

        }


    });


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

    detailsPriority.textContent = task.priority;

    detailsStatus.textContent = task.status;

    detailsDate.textContent = task.dueDate;



    detailsModal.style.display = "flex";


}






function closeDetails(){

    detailsModal.style.display = "none";

}





renderTasks();

updateStatistics();