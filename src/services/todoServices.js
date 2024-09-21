const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (todoData, userId) => {
  const newTodo = new Todo({ ...todoData, userId });
  await newTodo.save();
  return newTodo;
};

// Get all todos
exports.getTodos = async () => {
  return await Todo.find();
};

// Update a todo by ID and userId
exports.updateTodo = async (todoId, todoData) => {
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId },
    { $set: todoData },
    { new: true }
  );
  return updatedTodo;
};

// Delete a todo by ID and userId
exports.deleteTodo = async (todoId) => {
  const deletedTodo = await Todo.findOneAndDelete({ _id: todoId });
  return deletedTodo;
};
