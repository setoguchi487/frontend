import apiClient from "./axiosInstance";

const getUser = async (user_id: number) => {
  const res = await apiClient.get(`/user/${user_id}`);
  return res.data;
};

const updateUser = async (
  user_id: number,
  updates: {
    profile?: string;
    icon_url?: string;
  }
) => {
  const res = await apiClient.patch(`/user/${user_id}`, updates);
  return res.data;
};

export { getUser, updateUser };