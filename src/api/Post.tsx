import axios from "axios";

const post = async (user_id: string, token: string,msg: string) => {
    const data = {
        message: msg,
        token: token
    };
    const url = `${process.env.REACT_APP_API_URL}/post`;
    const res = await axios.post(url, data);
}

const getList = async (token: string, page: number = 1, records: number = 10) => {
  const start = (page - 1) * records;
  const url = `${process.env.REACT_APP_API_URL}/post?token=${token}&start=${start}&records=${records}`;
  const res = await axios.get(url);
  return res.data;
};

const deletePost = async (postId: number, token: string) => {
  const url = `${process.env.REACT_APP_API_URL}/post/${postId}?token=${token}`;
  
  try {
    const res = await axios.delete(url);
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
const searchPosts = async (query: string, token: string, page: number = 1, records: number = 10) => {
  const start = (page - 1) * records;
  const url = `${process.env.REACT_APP_API_URL}/post/search?q=${encodeURIComponent(query)}&token=${token}&start=${start}&records=${records}`;
  
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    console.error('Search API error:', error);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    }
    throw error;
  }
};

export { post, getList, deletePost, searchPosts };