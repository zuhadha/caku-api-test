const {mongoose } = require("mongoose")

const tasksSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true

    },
    description: {
        type: String, 
        required: false
    },
    deadline_date: {
        type: Date,
        required: true
    },
    deadline_time: {
        type: String,
        required: false
    },
 
})

module.exports = mongoose.model('Task', tasksSchema)