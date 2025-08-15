import axios from 'axios';
import auth from '../store/auth';
import authAdmin from '../store/authAdmin';

export const BASE_URL = 'https://api.freightmanager.cloud';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  config.headers.Authorization = authAdmin.isAuthAdmin
    ? `Bearer ${auth.token}`
    : `Bearer ${authAdmin.token}`;
  return config;
});

// api.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${authAdmin.token}`;
//   return config;
// });

export default api;
