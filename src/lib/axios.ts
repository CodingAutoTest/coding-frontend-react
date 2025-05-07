import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 500) {
      window.location.href = '/error'; // ❗경로를 /error로 하고 위 라우터에서 잡아도 됨
    }
    return Promise.reject(error);
  },
);
