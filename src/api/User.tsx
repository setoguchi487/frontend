import axios from "axios";

const getUser = async (user_id: number, token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/user/${user_id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

export { getUser };