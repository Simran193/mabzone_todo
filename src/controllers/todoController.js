const todoService = require('../services/todoServices');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body, req.user.id);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all todos for the authenticated user
exports.getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.user.id);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific todo by ID
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
