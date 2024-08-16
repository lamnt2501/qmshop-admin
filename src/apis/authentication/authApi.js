import axios from "axios";
const BASE_URL = "http://localhost:80/api/v1/auth";

export async function login(email, password) {
  const res = { token: "", error: "" };

  await axios
    .post(`${BASE_URL}/login`, {
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
