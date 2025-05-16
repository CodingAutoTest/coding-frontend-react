import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // 문제 데이터와 테스트 케이스를 가져오는 API는 토큰 체크 제외
  if (config.url?.includes('/problems/') || config.url?.includes('/testcases/')) {
    return config;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    // 토큰이 없으면 API 요청을 중단
    return Promise.reject(new Error('No token available'));
  }
  config.headers.Authorization = token;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status >= 400) {
      window.location.href = '/error';
    }
    return Promise.reject(error);
  },
);

export const unwrap = <T>(response: AxiosResponse): T => response.data.result.result;
