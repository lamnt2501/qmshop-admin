import { TextField } from "@mui/material";
import { useAuthContext } from "../../contexts/authContext";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect } from "react";
import { login } from "../../apis/authApi";
import Loader from "../../ui/Loader";

function LoginPage() {
  const { dispatch, setToken, token } = useAuthContext();
  const { state } = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();
  const isLoading = state === "loading" || state === "submitting";

  useEffect(() => {
    if (token) {
      navigate("/");
    }

    if (data?.token) {
      dispatch(setToken(data.token));
      navigate("/");
    }
  }, [data, token]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="grid h-[100dvh] grid-cols-2">
        <div className="bg-[url('/login.jpg')] bg-cover"></div>
        <div className="flex flex-col items-center justify-center p-3">
          <div className="mb-10">
            <img src="/logo.png" alt="Logo" className="w-full" />
          </div>
          <Form
            method="post"
            className="flex flex-col items-center gap-3 sm:w-[300px] md:w-[350px] lg:w-[500px]"
          >
            <TextField
              label="Email"
              type="email"
              id="email"
              name="email"
              required
              defaultValue="admin@gmail.com"
              className="w-full"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              id="password"
              required
              defaultValue="12345678"
              className="w-full px-2 py-2"
            />
            <button className="max-w-[50%] rounded-md border bg-cyan-400 px-4 py-2 uppercase text-white transition-all hover:bg-cyan-300 focus:outline-none focus:ring focus:ring-cyan-400 active:scale-95">
              Đăng Nhập
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export async function action({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const data = await login(formData.email, formData.password);
  const res = {};
  res.token = data.token;
  res.error = data.error;
  return res;
}

export default LoginPage;
