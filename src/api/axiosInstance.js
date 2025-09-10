import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if backend base URL changes
});

export default axiosInstance;
