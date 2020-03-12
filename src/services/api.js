import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.100.50.71:3333',
});

export default api;
