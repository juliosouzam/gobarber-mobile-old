import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.100.50.74:3333',
});

export default api;
