import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';

const TodoForm = ({ onSubmit, initialData, onUpdate, isEditing }) => {
  const [todo, setTodo] = useState(initialData || { title: '', description: '', dueDate: '', status: 'Pending' });

  useEffect(() => {
    if (isEditing && initialData) {
      setTodo(initialData);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => setTodo({ ...todo, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate(todo);
    } else {
      onSubmit(todo);
    }
    setTodo({ title: '', description: '', dueDate: '', status: 'Pending' }); // to reset form
  };

  return (
    <Paper elevation={3} className="p-4 mb-4">
      <Typography variant="h6">{isEditing ? 'Edit Todo' : 'Add Todo'}</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <TextField
          name="title"
          value={todo.title}
          onChange={handleChange}
          label="Title"
          variant="outlined"
          required
        />
        <TextField
          name="description"
          value={todo.description}
          onChange={handleChange}
          label="Description"
          variant="outlined"
          multiline
          rows={2}
          className="mt-2"
        />
        <TextField
          type="date"
          name="dueDate"
          value={todo.dueDate}
          onChange={handleChange}
          variant="outlined"
          className="mt-2"
        />
        <TextField
          select
          name="status"
          value={todo.status}
          onChange={handleChange}
          label="Status"
          variant="outlined"
          className="mt-2"
          SelectProps={{
            native: true,
          }}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </TextField>
        <Button variant="contained" color="primary" type="submit" className="mt-3">
          {isEditing ? 'Update Todo' : 'Save Todo'}
        </Button>
      </form>
    </Paper>
  );
};

export default TodoForm;
