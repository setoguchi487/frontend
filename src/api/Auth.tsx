import axios from 'axios';

const sign_in = async (user_id: string, pass: string) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('REACT_APP_API_URL:', apiUrl);
  
  if (!apiUrl) {
    console.error('REACT_APP_API_URL is not defined!');
    throw new Error('API URL is not configured. Please check environment variables.');
  }
  
  const url = `${apiUrl}/auth?user_id=${user_id}&password=${pass}`;
  console.log('Requesting:', url);
  
  try {
    const res = await axios.get(url);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
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
    console.error('API Error:', error);
    throw error;
  }
};

export {sign_in, sign_up};