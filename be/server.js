const http = require('http')
const host = 'localhost'
const port = 8000
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

let tasks = []

app.get('/tasks', (req, res) => {
    res.json(tasks)
})

app.post('/tasks', (req, res) => {
    const data = req.body

    const newTask = {
        id: tasks.length + 1,
        task : data.task
    }

    tasks.push(newTask)

    res.status(201).json({message: 'Task created successfully', task: newTask})
})

app.put('/task/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body

    const taskToUpdate = tasks.find((task) => task.id === parseInt(id))
    
    if(!taskToUpdate) {
        return res.status(404).json({message: 'Task not found'})
    }

    taskToUpdate.task = data.task || taskToUpdate.task

    res.json({message: 'Task updated successfully', task: taskToUpdate})
})

app.delete('/task/:index', (req, res) => {
    const index = parseInt(req.params.index)

    if (index >= 0 && index < tasks.length) {
        const deletedTask = tasks.splice(index, 1)[0]
        res.json({ message: 'Task deleted successfully', task: deletedTask })
    } 
    else {
        res.status(404).json({ error: 'Task not found' })
    }
})

app.listen(port, () => {
    console.log(`server is running on ${host}:${port}`)
})