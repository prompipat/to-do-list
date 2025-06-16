const http = require('http')
const host = 'localhost'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks ORDER BY id')
        res.json(result.rows)
    }
    catch (err) {
        res.status(500).json({error : err.message})
    }
})

app.post('/tasks', async (req, res) => {
    try {
        const {task} = req.body
        const result = await db.query('INSERT INTO tasks (task) VALUES ($1) RETURNING *', [task])
        res.status(201).json(result.rows[0])

    }
    catch (err) {
        res.status(500).json({error : err.message})
    }
})

app.put('/tasks/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {task, done} = req.body
        const result = await db.query('UPDATE tasks SET task = COALESCE(NULLIF($1, \'\'), task), done = $2 WHERE id = $3 RETURNING *', 
            [task, done, id])
        res.json(result.rows[0])
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await db.query('DELETE FROM tasks WHERE id = $1', [id])
    res.json({ message: 'Task deleted successfully' })
  } 
  catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(8000, () => {
    console.log(`server is running on http://${host}:8000`)
})