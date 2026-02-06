import axios from "axios";

const BASE_URL = "https://fitera-api.vercel.app";

export async function fetchProfile() {
  const response = await axios.get(`${BASE_URL}/profiles`);
  return response.data;
}
