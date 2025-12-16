import axios from "axios";

const getUser = async (user_id: number, token: string) => {
  const url = `http://localhost:8000/user/${user_id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

export { getUser };