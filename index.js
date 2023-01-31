const container = document.querySelector('#task-list-container')

function renderOneTask(task) {
    let card = document.createElement('div')
    card.className = "task"
    card.innerHTML = `
    <p id="task-name">${task.task}</p>
    <p id="task-notes">${task.notes}</p>
    <p id="task-date">${task.date}</p>
    <button id="delete" type="delete-button">x</button>
    `
    //add task to DOM
    container.appendChild(card)
}

function getAllTasks() {
    fetch("http://localhost:3000/tasks")
    .then((resp) => resp.json())
    .then(taskData => {
        for (let i = 0; i < taskData.length; i++) {
            renderOneTask(taskData[i])
        }
    })
}

getAllTasks()
