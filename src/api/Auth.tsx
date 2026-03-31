import apiClient from './axiosInstance';

const sign_in = async (user_id: string, pass: string) => {
  const res = await apiClient.post('/auth/login', { user_id, password: pass });
  return res.data;
};

const sign_up = async (name: string, email: string, password: string) => {
  const res = await apiClient.post('/auth/register', { name, email, password });
  return res.data;
};

export {sign_in, sign_up};