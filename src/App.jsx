import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// import store from "./states/store";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./features/dashboard/Dashboard";
import LoginPage, {
  action as loginAction,
} from "./features/authentication/LoginPage";
import Error from "./ui/Error";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate replace to={"/dashboard"} />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <p>hi</p>,
      },
      {
        path: "orders/:id",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Dashboard />,
        children: [
          { index: true, element: <p>hi</p> },
          {
            path: "new",
            element: <Dashboard />,
          },
          {
            path: "category",
            element: <Dashboard />,
          },
          {
            path: "size",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "customers",
        element: <Dashboard />,
      },
      {
        path: "discounts",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    // <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    // </Provider>
  );
}
export default App;
