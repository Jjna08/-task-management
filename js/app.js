console.log(tasks);

const addTaskBtn = document.getElementById("addTaskBtn");

const saveTaskBtn = document.getElementById("saveTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const taskModal = document.getElementById("taskModal");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

const searchInput = document.getElementById("searchInput");

function openModal() {
    console.log("Modal Opened");
}

addTaskBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click",closeModalBtn)



const taskCategory=document.getElementById("taskCategory");
const taskPriority=document.getElementById("taskPriority");
const taskDueDate=document.getElementById("taskDueDate");

function addtask(){
    const newTask ={
        id:Date.now(),
        title:taskTitle.value,
        description:taskDescription.value,

        category:taskCategory.value,
        priority:taskPriority.value,

        dueDate:taskDueDate.value,
        completed:false

    };

    tasks.push(newTask);
    console.log(tasks);


}

saveTaskBtn.addEventListener(
    "click",
    addtask
);