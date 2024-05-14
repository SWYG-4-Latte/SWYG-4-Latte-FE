import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://latte-server.site',
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiInstance;
