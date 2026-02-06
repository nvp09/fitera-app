import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET /posts
export const fetchPosts = async () => {
  const res = await axios.get(`${API_BASE_URL}/posts`);
  return res.data;
};

// POST /posts
export const createPost = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/posts`, payload);
  return res.data;
};
