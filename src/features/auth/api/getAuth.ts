import axios from 'axios';

export type SignupPayload = {
  email: string;
  pw: string;
  name: string;
};

export type LoginPayload = {
  email: string;
  pw: string;
};

export async function signup(payload: SignupPayload) {
  const res = await axios.post('http://127.0.0.1:8080/auth/signup', payload);
  return res.data;
}

export async function login(payload: LoginPayload) {
  const res = await axios.post('http://127.0.0.1:8080/auth/login', payload);
  return res.data;
}
