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

apiInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 토큰이 유효하지 않은 경우 저장된 토큰 삭제
    if (error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
      }
    }

    return Promise.reject(error.response);
  },
);

export default apiInstance;
