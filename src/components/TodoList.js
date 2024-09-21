import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Paper, LinearProgress } from '@mui/material';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/api';
import TodoForm from './TodoForm';
import Charts from './Charts';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetchTodos(token);
      setTodos(response.data);
    };
    loadTodos();
  }, [token]);

  const handleCreateTodo = async (todo) => {
    const response = await createTodo(todo, token);
    setTodos([...todos, response.data]);
  };

  const handleUpdateTodo = async (todo) => {
    const response = await updateTodo(todo, token); 
    setTodos(todos.map(t => (t._id === response.data._id ? response.data : t)));
    setIsEditing(false);
    setSelectedTodo(null);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id, token); 
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const completedCount = todos.filter(todo => todo.status === 'Completed').length;
  const totalCount = todos.length;
  const completionPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <Container>
      <Typography variant="h4" align="center" className="mt-4">Todo List</Typography>
      <TodoForm 
        onSubmit={handleCreateTodo} 
        initialData={selectedTodo} 
        onUpdate={handleUpdateTodo} 
        isEditing={isEditing} 
      />

      <Paper elevation={3} className="p-4 mb-4">
        <Typography variant="h6">Progress: {completionPercentage.toFixed(2)}%</Typography>
        <LinearProgress variant="determinate" value={completionPercentage} className="mb-3" />
      </Paper>

      <Charts todos={todos} />

      <Paper elevation={3} className="p-4">
        <List>
          {todos.map((todo) => (
            <ListItem key={todo._id} divider>
              <ListItemText primary={todo.title} secondary={`Status: ${todo.status}`} />
              <Button 
                variant="contained" 
                color="secondary" 
                size="small" 
                onClick={() => {
                  setSelectedTodo(todo);
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                size="small" 
                className="ml-2" 
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoList;
