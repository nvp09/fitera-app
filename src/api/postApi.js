import axios from "axios";

const BASE_URL = "https://blog-post-project-api.vercel.app/posts";

export async function fetchPosts({
  category,
  keyword,
  page = 1,
  limit = 6,
}) {
  const params = { page, limit };

  if (category && category !== "Highlight") {
    params.category = category;
  }

  if (keyword && keyword.trim() !== "") {
    params.keyword = keyword;
  }

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}

