import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true,
});

export const unwrap = <T>(response: AxiosResponse, key: string): T => response.data.result[key];
