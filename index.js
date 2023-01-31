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
