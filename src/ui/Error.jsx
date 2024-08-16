import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div>
      <h1>{"Có gì đó không ổn"}</h1>
      <button onClick={() => navigate(-1)}>Trở lại</button>
    </div>
  );
}

export default Error;
