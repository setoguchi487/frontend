import apiClient from "./axiosInstance";

const post = async (msg: string) => {
    await apiClient.post('/post', { message: msg });
}

const getList = async (page: number = 1, records: number = 10) => {
  const start = (page - 1) * records;
  const res = await apiClient.get(`/post?start=${start}&records=${records}`);
  return res.data;
};

const deletePost = async (postId: number) => {
  const res = await apiClient.delete(`/post/${postId}`);
  return res.data;
};

const searchPosts = async (query: string, page: number = 1, records: number = 10) => {
  const start = (page - 1) * records;
  const res = await apiClient.get(`/post/search?q=${encodeURIComponent(query)}&start=${start}&records=${records}`);
  return res.data;
};

export { post, getList, deletePost, searchPosts };