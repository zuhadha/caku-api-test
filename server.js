require('dotenv').config() 

const express = require('express')
const app = express()  
const mongoose = require('mongoose')

const port = 4000

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to MongoDB"))


app.use(express.json())

const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter) 

app.listen(process.env.PORT || port, () => console.log('Server started'))  