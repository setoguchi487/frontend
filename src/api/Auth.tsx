import axios from 'axios';

const sign_in = async (user_id: string, pass: string) => {
  const url = `http://localhost:8000/auth?user_id=${user_id}&password=${pass}`;
  console.log(url);
  const res = await axios.get(url);
  console.log(res);
  return res.data;
};

export {sign_in};