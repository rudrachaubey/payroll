import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7106/api/',
});
export default axiosInstance;
