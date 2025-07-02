let input = document.getElementById('input')
let taskList = document.getElementById('tasklist')

const BASE_URL = 'http://34.61.173.36:8000'

async function addTask() {sudo
    let taskText = input.value.trim()

    if (taskText === '') return

    try {
        await axios.post(`${BASE_URL}/tasks`, {
            task: taskText
        })
        
        loadTask()
        input.value = ''
    }
    catch (error) {
        console.error('Failed to add task:', error)
    }
}

async function loadTask() {
    try {
        const res = await axios.get(`${BASE_URL}/tasks`)
        const tasks = res.data

        taskList.innerHTML = ''
        tasks.forEach(task => {
            const li = document.createElement('li')
            li.style.display = 'flex'
            li.style.alignItems = 'center'

            const textSpan = document.createElement('span')
            textSpan.textContent = task.task
            textSpan.style.flexGrow = '1'
            if (task.done) {
                textSpan.style.textDecoration = 'line-through'
                textSpan.style.color = 'gray'
                li.style.backgroundColor = '#a3cfff'
            }

            // Done / Undone button
            const doneBtn = document.createElement('button')
            doneBtn.style.marginRight = '0.4rem'
            doneBtn.textContent = task.done ? '✅' : '⬜'
            doneBtn.onclick = () => toggleDone(task.id, !task.done)

            // Edit button
            const editBtn = document.createElement('button')
            editBtn.textContent = '✏️'
            editBtn.style.margin = '0.4rem'
            editBtn.style.padding = '0.1rem 0.5rem'
            editBtn.onclick = () => editTask(task.id, task.task)

            // Delete button
            const delBtn = document.createElement('button')
            delBtn.textContent = '❌'
            delBtn.style.margin = '0.4rem'
            delBtn.style.padding = '0.1rem 0.5rem'
            delBtn.onclick = () => deleteTask(task.id)

            li.appendChild(doneBtn)
            li.appendChild(textSpan)
            li.appendChild(editBtn)
            li.appendChild(delBtn)

            taskList.appendChild(li)
        })
    } 
    catch (error) {
        console.error('Failed to load tasks:', error)
    }
}

async function toggleDone(id, doneStatus) {
  try {
    await axios.put(`${BASE_URL}/tasks/${id}`, {
      task: '',
      done: doneStatus
    })
    loadTask()
  } 
  catch (error) {
    console.error('Failed to update done status:', error)
  }
}

async function editTask(id, oldText) {
  const newText = prompt("Edit your task:", oldText)
  if (newText === null || newText.trim() === '') return

  try {
    await axios.put(`${BASE_URL}/tasks/${id}`, {
      task: newText,
      done: false
    })
    loadTask()
  } 
  catch (error) {
    console.error('Failed to edit task:', error)
  }
}

async function deleteTask(id) {
    try {
        await axios.delete(`${BASE_URL}/tasks/${id}`)
        loadTask()
    }
    catch (error) {
        console.error('Failed to Delete task: ', error)
    }
}

window.onload = loadTask