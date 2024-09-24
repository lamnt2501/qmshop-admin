import { useNavigate, useRouteError } from "react-router-dom";

const errorMessage = (error) => {
  switch (error.status) {
    case 404:
      return "Page Not Found";
    default:
      return "Something Went Wrong!";
  }
};

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div className="flex h-[100dvh] items-center justify-center space-x-4 p-14">
      <div className="flex-1">
        <img
          src="https://img.freepik.com/premium-vector/website-maintenance-repair-concept_108061-1877.jpg?w=996"
          alt="page fixing image"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center space-y-4">
        <h1 className="text-center text-[40px] font-extrabold text-red-600">
          {errorMessage(error)}
        </h1>
        <button
          className="max-w-[200px] rounded-md bg-main px-4 py-3 text-lg text-white"
          onClick={() => navigate(-1)}
        >
          ⬅️ Go Back
        </button>
      </div>
    </div>
  );
}

export default Error;
