const express = require('express')
const router = express.Router()
const User = require('../models/user')

// getting all 
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
 
// getting one
router.get('/:id', getTask, (req, res) => {
    res.json(res.User)
})

// creating one
router.post('/', async (req, res) => {
    const User = new User({
        title: req.body.title, 
        subject: req.body.subject,
        description: req.body.description,
        deadline_date: req.body.deadline_date,
        deadline_time: req.body.deadline_time,

    })

    try {
        const newTask = await User.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//updating one
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.title != null) {
        res.User.title = req.body.title
    }
    if (req.body.description != null) {
        res.User.description = req.body.description
    }
    if (req.body.subject != null) {
        res.User.subject = req.body.subject
    }
    if (req.body.deadline_date != null) {
        res.User.deadline_date = req.body.deadline_date
    }
    if (req.body.deadline_time != null) {
        res.User.deadline_time = req.body.deadline_time
    }

    try {
        const updatedTask = await res.User.save()
        res.json(updatedTask)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// deleting one
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.User.deleteOne()
        res.json({message: "deleted User"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

async function getTask(req, res, next) {
    let User
    try {
        User = await User.findById(req.params.id)
        if (User == null) {
            return res.status(404).json({message: 'Cannot find User!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.User = User
    next()
}

module.exports = router