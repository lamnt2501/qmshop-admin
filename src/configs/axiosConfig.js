import axios from "axios";
import Cookies from "js-cookie";
import { VITE_MANAGEMENT_API_URL } from "./envConfig";

export default function axiosFactory() {
  const token = Cookies.get("accessToken");
  if (!token) throw new Error("Token not found!");
  return axios.create({
    baseURL: VITE_MANAGEMENT_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
