const STORAGE_KEY = "taskflow_tasks";

function getTasks() {

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }

}

function saveTasks(tasks) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

}