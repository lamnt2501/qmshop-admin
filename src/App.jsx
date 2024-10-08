import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import store from "./states/store";
import AppLayout from "./ui/AppLayout";
import Dashboard, {
  loader as dashboardLoader,
} from "./features/dashboard/Dashboard";
import LoginPage, {
  action as loginAction,
} from "./features/authentication/LoginPage";
import Error from "./ui/Error";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import OrderDashboard, {
  loader as orderLoader,
} from "./features/order/OrderDashboard";
import OrderDetails, {
  action as orderDetailsAction,
  loader as orderDetailsLoader,
} from "./features/order/OrderDetails";
import ProductDashboard, {
  loader as productLoader,
} from "./features/product/ProductDashboard";
import ProductDetails, {
  action as productDetailsAction,
  loader as productDetailsloader,
} from "./features/product/ProductDetails";
import NewProduct, {
  action as newProductAction,
  loader as newProductLoader,
} from "./features/product/NewProduct";
import SizeDashboard, {
  loader as sizeLoader,
  action as sizeAction,
} from "./features/product/SizeDashboard";
import ColorDasboard, {
  action as colorAction,
  loader as colorLoader,
} from "./features/product/ColorDasboard";
import BrandDashboard, {
  // action as brandAction,
  loader as brandLoader,
} from "./features/product/BrandDashboard";
import CategoryDashboard, {
  action as categoryAction,
  loader as categoryLoader,
} from "./features/product/CategoryDashboard";
import CustomerDashboard, {
  loader as customerLoader,
} from "./features/customer/CustomerDashboard";
import CustomerDetails, {
  loader as customerDetailsLoader,
} from "./features/customer/CustomerDetails";
import DiscountDasboard, {
  loader as discountLoader,
} from "./features/discount/DiscountDasboard";
import NewDiscount, {
  action as newDiscountAction,
  loader as newDiscountLoader,
} from "./features/discount/NewDiscount";
import { ToastContainer } from "react-toastify";

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
        loader: dashboardLoader,
        id: "dashboard",
      },
      {
        path: "orders",
        element: <OrderDashboard />,
        loader: orderLoader,
      },
      {
        id: "orderDetails",
        path: "orders/:id",
        element: <OrderDetails />,
        loader: orderDetailsLoader,
        action: orderDetailsAction,
      },
      {
        path: "products",
        element: <ProductDashboard />,
        loader: productLoader,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
        loader: productDetailsloader,
        action: productDetailsAction,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        loader: newProductLoader,
        action: newProductAction,
      },
      {
        path: "products/sizes",
        element: <SizeDashboard />,
        loader: sizeLoader,
        action: sizeAction,
      },
      {
        path: "products/colors",
        element: <ColorDasboard />,
        loader: colorLoader,
        action: colorAction,
      },
      {
        path: "products/brands",
        element: <BrandDashboard />,
        loader: brandLoader,
        // action: brandAction,
      },
      {
        path: "products/categories",
        element: <CategoryDashboard />,
        loader: categoryLoader,
        action: categoryAction,
      },
      {
        path: "customers",
        element: <CustomerDashboard />,
        loader: customerLoader,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
        loader: customerDetailsLoader,
      },
      {
        path: "discounts",
        element: <DiscountDasboard />,
        loader: discountLoader,
      },
      {
        path: "discounts/new",
        element: <NewDiscount />,
        loader: newDiscountLoader,
        action: newDiscountAction,
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
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </Provider>
  );
}
export default App;
