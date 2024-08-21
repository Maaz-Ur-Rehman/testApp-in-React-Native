
import { getAuthHeader } from '@/utilities/auth';
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.getharvest.app/',
  // baseURL: 'http://192.168.100.66:2300/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const authHeader = await getAuthHeader();
    // console.log(authHeader?.Authorization, "auth header");
    if (authHeader) {
      config.headers['Authorization'] = authHeader.Authorization; // Use the header as is
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;