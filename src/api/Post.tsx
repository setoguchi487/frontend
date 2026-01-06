import axios from "axios";

const post = async (user_id: string, token: string,msg: string) => {
    const data = {
        message: msg,
        token: token
    };
    const url = `${process.env.REACT_APP_API_URL}/post`;
    const res = await axios.post(url, data);
    console.log(res);
}

const getList = async (token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/post?token=${token}&records=10`;
  const res = await axios.get(url);
  return res.data;
};

export { post, getList };