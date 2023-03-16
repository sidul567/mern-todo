// external imports
const express = require('express');
const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/getTodo');
const router = express.Router();

router.get('/',getTodo)

router.post('/',addTodo);

router.put('/:id',updateTodo);

router.delete('/:id',deleteTodo);

module.exports = router;