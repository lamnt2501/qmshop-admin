import axios from "axios";
import { VITE_AUTH_API_URL, VITE_PUBLIC_API_URL } from "../configs/envConfig";
import axiosFactory from "../configs/axiosConfig";

export async function login(email, password) {
  const res = {};

  await axios
    .post(`${VITE_AUTH_API_URL}`, {
      email,
      password,
    })
    .then((response) => {
      res.token = response.data.token;
    })
    .catch((err) => {
      if (err.response) {
        res.error = err.response.data?.message;
      } else {
        res.error = "Đã có lỗi không mong muốn xảy ra";
      }
    });

  return res;
}

export async function me() {
  const api = axiosFactory();
  try {
    return (await api.get(`${VITE_PUBLIC_API_URL}/users/me`)).data;
  } catch (error) {
    return { error };
  }
}
