import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true,
});

api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
api.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const url = config.url || '';

  // 인증이 필요한 요청에만 토큰 추가
  const shouldAddToken = !url.startsWith('/auth');

  if (shouldAddToken && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  },
);

export const unwrap = <T>(response: AxiosResponse): T => response.data.result.result;
