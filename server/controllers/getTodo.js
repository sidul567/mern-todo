const { findByIdAndDelete } = require('../models/Todo');
const Todo = require('../models/Todo');

async function getTodo(req,res,next){
    try{
        const todos = await Todo.find();

        res.json(todos);
    }catch(err){
        next(err);
    }
}

async function addTodo(req,res,next){
    try{
        const todo = new Todo({
            text: req.body.text,
        })

        await todo.save();

        res.json(todo);
    }catch(err){
        next(err);
    }
}

async function updateTodo(req,res,next){
    try{
        const todo = await Todo.findById(req.params.id);

        todo.complete = !todo.complete;

        await todo.save();

        res.json(todo);
    }catch(err){
        next(err);
    }
}

async function deleteTodo(req,res,next){
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);

        res.json(todo);
    }catch(err){
        next(err);
    }
}

async function updateTodoText(req,res,next){
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, {text: req.body.text}, {
            'new': true,
        });

        res.json(todo);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    updateTodoText,
}