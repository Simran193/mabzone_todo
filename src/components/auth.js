import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';

const Auth = ({ setToken }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin ? await login(formData) : await signup(formData);
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className="p-6 mt-6">
        <Typography variant="h5" align="center">{isLogin ? 'Login' : 'Signup'}</Typography>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit" className="mt-3">
            {isLogin ? 'Login' : 'Signup'}
          </Button>
          <Button color="secondary" onClick={() => setIsLogin(!isLogin)} className="mt-2">
            Switch to {isLogin ? 'Signup' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
