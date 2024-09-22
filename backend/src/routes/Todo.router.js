const express = require('express');

const router = express.Router();
const { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo} = require('../controllers/Todo.controller');



router.post('/newtodo', createTodo);
router.get('/todos',getAllTodos);
router.get('/todos/:id', getTodoById);
router.put('/todos/:id',updateTodo)
router.delete('/todos/:id',deleteTodo);


module.exports = router;