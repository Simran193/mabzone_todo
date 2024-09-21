import React, { useState } from 'react';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import { Container } from '@mui/material';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Container>
      {token ? <TodoList token={token} /> : <Auth setToken={setToken} />}
    </Container>
  );
};

export default App;
