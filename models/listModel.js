const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todoList')

const todoSchema = new mongoose.Schema({
    title: String,
    content: String,
    isDone: Boolean
})

todoSchema.set('collection', 'todos')
module.exports = mongoose.model('todo', todoSchema)