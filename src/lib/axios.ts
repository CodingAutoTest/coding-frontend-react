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

  // 문제 상태(status) 필터링 또는 단순 로그인 여부로 판단
  const shouldAddToken =
    !url.startsWith('/auth') &&
    !url.startsWith('/tags') &&
    !url.startsWith('/testcases') &&
    !(url.startsWith('/problems') && !token); // 로그인한 경우에는 붙임

  if (shouldAddToken && token) {
    config.headers.Authorization = token;
  }

  return config;
});

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status >= 400) {
//       window.location.href = '/error';
//     }
//     return Promise.reject(error);
//   },
// );

export const unwrap = <T>(response: AxiosResponse): T => response.data.result.result;
