let input = document.getElementById('input')
let taskList = document.getElementById('tasklist')

function addTask() {
    let taskText = input.value.trim()

    if (taskText === '') return

    const li = document.createElement('li')
    li.textContent = taskText

    taskList.appendChild(li)
    input.value = ''
}