import axios from "axios";

const post = async (user_id: string, token: string,msg: string) => {
    console.log('=== Frontend post API called ===');
    console.log('user_id:', user_id);
    console.log('token:', token);
    console.log('msg:', msg);
    
    const data = {
        message: msg,
        token: token
    };
    const url = `${process.env.REACT_APP_API_URL}/post`;
    const res = await axios.post(url, data);
    console.log('response:', res);
    console.log('=== Frontend post API completed ===');
}

const getList = async (token: string, page: number = 1, records: number = 10) => {
  const start = (page - 1) * records;
  const url = `${process.env.REACT_APP_API_URL}/post?token=${token}&start=${start}&records=${records}`;
  const res = await axios.get(url);
  return res.data;
};

const deletePost = async (postId: number, token: string) => {
  console.log('=== Frontend deletePost API called ===');
  console.log('postId:', postId);
  console.log('token:', token);
  
  const url = `${process.env.REACT_APP_API_URL}/post/${postId}?token=${token}`;
  console.log('DELETE URL:', url);
  
  try {
    const res = await axios.delete(url);
    console.log('delete response:', res);
    console.log('=== Frontend deletePost API completed ===');
    return res.data;
  } catch (error: any) {
    console.error('Delete API error:', error);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    }
    throw error;
  }
};

export { post, getList, deletePost };