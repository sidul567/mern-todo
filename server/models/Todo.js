const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    date_time: {
        type: Date,
        default: Date.now,
    }
})

const Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;