const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// getting all 
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
 
// getting one
router.get('/:id', getTask, (req, res) => {
    res.json(res.task)
})

// creating one
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title, 
        subject: req.body.subject,
        description: req.body.description,
        deadline_date: req.body.deadline_date,
        deadline_time: req.body.deadline_time,

    })

    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//updating one
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title
    }
    if (req.body.description != null) {
        res.task.description = req.body.description
    }
    if (req.body.subject != null) {
        res.task.subject = req.body.subject
    }
    if (req.body.deadline_date != null) {
        res.task.deadline_date = req.body.deadline_date
    }
    if (req.body.deadline_time != null) {
        res.task.deadline_time = req.body.deadline_time
    }

    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// deleting one
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.deleteOne()
        res.json({message: "deleted task"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

async function getTask(req, res, next) {
    let task
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({message: 'Cannot find task!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.task = task
    next()
}

module.exports = router