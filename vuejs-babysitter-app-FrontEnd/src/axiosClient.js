import axios from 'axios'

const axiosClient = axios.create({
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  baseURL: process.env.NODE_ENV == "development" ? 
        import.meta.env.VITE_BACKEND_URL : '/api',
});

export default axiosClient;