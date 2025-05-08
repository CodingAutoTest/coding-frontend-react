import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true,
});
// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 500) {
//       window.location.href = '/error'; // ❗경로를 /error로 하고 위 라우터에서 잡아도 됨
//     }
//     return Promise.reject(error);
//   },
// );

export const unwrap = <T>(response: AxiosResponse, key: string): T => response.data.result[key];
