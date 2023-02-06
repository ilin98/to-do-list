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
    card.addEventListener("mouseover", () => {
        card.style.backgroundColor = 'gainsboro'
    })
    card.addEventListener("mouseout", () => {
        card.style.backgroundColor = "white"
    })
    card.querySelector("#delete").addEventListener("click", () => {
        card.remove()
        deleteTask(task.id)
    })
    container.appendChild(card)
}

function getAllTasks() {
    fetch("http://localhost:3000/tasks")
    .then((resp) => resp.json())
    .then(taskData => taskData.forEach(renderOneTask))
}

getAllTasks()

const form = document.querySelector(".hidden")
const addButton = document.querySelector(".unpressed-button")
addButton.addEventListener("click", () => {
    if (addButton.className === "unpressed-button") {
        addButton.className = "pressed-button"
        addButton.textContent = "minimize"
        form.className = "not-hidden"
    } else {
        addButton.className = "unpressed-button"
        addButton.textContent = "Add task"
        form.className = "hidden"
    }
})

document.querySelector("#to-do-form").addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    let taskObj = {
        task: e.target.task.value,
        date: e.target.date.value,
        notes: e.target.notes.value
    }
    e.target.reset()
    postTask(taskObj)
}

function postTask(taskObj) {
    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(taskObj)
    })
    .then(resp => resp.json())
    .then(task => renderOneTask(task))
}

function deleteTask(id) {
    fetch (`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(task => console.log(task))
}
