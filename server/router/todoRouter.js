// external imports
const express = require('express');
const { getTodo, addTodo, updateTodo, deleteTodo, updateTodoText } = require('../controllers/getTodo');
const router = express.Router();

router.get('/',getTodo)

router.post('/',addTodo);

router.put('/:id',updateTodo);

router.put('/updateText/:id',updateTodoText);

router.delete('/:id',deleteTodo);

module.exports = router;