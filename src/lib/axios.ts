import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true,
});

api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
api.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
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
