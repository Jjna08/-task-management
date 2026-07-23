function openModal() {

    const modalTitle = document.getElementById("modalTitle");

    if (modalTitle) {
        modalTitle.textContent =
        editingTaskId !== null ? "Edit Task Details" : "New Task";
    }

    const lastUpdated = document.getElementById("lastUpdatedNote");

    if (lastUpdated) {

        if (editingTaskId !== null) {

            const task = tasks.find(t => t.id === editingTaskId);

            lastUpdated.style.display = "block";
            lastUpdated.textContent =
            task && task.updatedBy
            ? `Last updated ${timeAgo(task.updatedAt)} by ${task.updatedBy}`
            : "";

        } else {

            lastUpdated.style.display = "none";

        }

    }

    document.getElementById("taskModal").style.display = "flex";

}

function closeModal() {

    document.getElementById("taskModal").style.display = "none";

    editingTaskId = null;

    clearInputs();

}

function timeAgo(dateString) {

    if (!dateString) {
        return "just now";
    }

    const diffMs = Date.now() - new Date(dateString).getTime();

    const diffHrs = Math.round(diffMs / 3600000);

    if (diffHrs < 1) {
        return "just now";
    }

    if (diffHrs === 1) {
        return "1 hour ago";
    }

    if (diffHrs < 24) {
        return `${diffHrs} hours ago`;
    }

    const diffDays = Math.round(diffHrs / 24);

    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;

}