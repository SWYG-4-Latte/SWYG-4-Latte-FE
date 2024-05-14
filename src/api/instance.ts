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
    // 토큰이 유효하지 않은 경우 현재 500에러, 서버 측 작업 완료 후 수정 예정
    if (error.response.status === 500) {
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
