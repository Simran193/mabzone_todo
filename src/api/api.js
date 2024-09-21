import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend URL

export const signup = (userData) => axios.post(`${API_URL}/auth/signup`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const fetchTodos = (token) => axios.get(`${API_URL}/todos/get-list`, { headers: { Authorization: `Bearer ${token}` } });
export const createTodo = (todo, token) => axios.post(`${API_URL}/todos/create`, todo, { headers: { Authorization: `Bearer ${token}` } });
export const updateTodo = (todo, token) => axios.put(`${API_URL}/todos/update${todo._id}`, todo, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTodod = (todo, token) => axios.delete(`${API_URL}/todos/${todo._id}`, { headers: { Authorization: `Bearer ${token}` } });
