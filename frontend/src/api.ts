export const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

import { API_URL } from '../api'; 


const response = await axios.post(`${API_URL}/api/login`, { email, password });