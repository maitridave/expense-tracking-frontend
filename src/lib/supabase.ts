import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/expenses'; // Updated API URL

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});