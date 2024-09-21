const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', verifyToken, createTodo);
router.get('/get-list', verifyToken, getTodos);
router.put('/update/:id', verifyToken, updateTodo);
router.delete('/delete/:id', verifyToken, deleteTodo);

module.exports = router;
