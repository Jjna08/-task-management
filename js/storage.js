const STORAGE_KEY = "tasks";


function saveTasks(tasks){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}



function getTasks(){

    const savedTasks = localStorage.getItem(STORAGE_KEY);


    if(savedTasks){

        return JSON.parse(savedTasks);

    }


    return [
        {
            id: 1,
            title: "Learn HTML",
            description: "Finish the homepage",
            category: "study",
            priority: "high",
            dueDate: "2026-07-10",
            completed: false
        }
    ];

}