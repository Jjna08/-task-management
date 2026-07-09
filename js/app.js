console.log(tasks);



const addTaskBtn = document.getElementById("addTaskBtn");

const saveTaskBtn = document.getElementById("saveTaskBtn");

const closeModalBtn = document.getElementById("closeModalBtn");



const taskModal = document.getElementById("taskModal");



const taskTitle = document.getElementById("taskTitle");

const taskDescription = document.getElementById("taskDescription");

const taskCategory = document.getElementById("taskCategory");

const taskPriority = document.getElementById("taskPriority");

const taskDueDate = document.getElementById("taskDueDate");



const searchInput = document.getElementById("searchInput");



const todoTasks = document.getElementById("todoTasks");

const inProgressTasks = document.getElementById("inProgressTasks");

const doneTasks = document.getElementById("doneTasks");




addTaskBtn.addEventListener("click", openModal);


closeModalBtn.addEventListener("click", closeModal);




function addTask(){

    const newTask = {

        id: Date.now(),

        title: taskTitle.value,

        description: taskDescription.value,

        category: taskCategory.value,

        priority: taskPriority.value,

        dueDate: taskDueDate.value,

        completed: false

    };


    tasks.push(newTask);


    console.log(tasks);


    renderTasks();


    closeModal();


    clearInputs();

}




function clearInputs(){

    taskTitle.value = "";

    taskDescription.value = "";

    taskDueDate.value = "";

}




saveTaskBtn.addEventListener(
    "click",
    addTask
);






function renderTasks(){

    todoTasks.innerHTML = "";

    inProgressTasks.innerHTML = "";

    doneTasks.innerHTML = "";



    tasks.forEach(task => {


        const taskCard = document.createElement("div");


        taskCard.className = "task-card";



        taskCard.innerHTML = `

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


            <button onclick="completeTask(${task.id})">
                Complete
            </button>


            <button onclick="deleteTask(${task.id})">
                Delete
            </button>

        `;



        if(task.completed){

            doneTasks.appendChild(taskCard);

        }
        else{

            todoTasks.appendChild(taskCard);

        }


    });


}





function completeTask(id){


    const task = tasks.find(task => task.id === id);



    if(task){

        task.completed = true;

    }



    renderTasks();


}






function deleteTask(id){


    tasks = tasks.filter(task => task.id !== id);


    renderTasks();


}





renderTasks();