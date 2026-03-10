import axios from 'axios';

const sign_in = async (user_id: string, pass: string) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  if (!apiUrl) {
    throw new Error('API URL is not configured. Please check environment variables.');
  }
  
  const url = `${apiUrl}/auth?user_id=${user_id}&password=${pass}`;
  
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const sign_up = async (name: string, email: string, password: string) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not configured. Please check environment variables.');
  }

  const url = `${apiUrl}/auth/register`;

  try {
    const res = await axios.post(url, { name, email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {sign_in, sign_up};