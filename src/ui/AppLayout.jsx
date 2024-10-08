import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Loader from "./Loader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SubscribeComponent from "./SubscribeComponent";
function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SubscribeComponent />
      <div>
        {isLoading && <Loader />}
        <SideBar />
        <div className="ml-[76px] min-h-[100dvh] bg-gray-100 sm:ml-[200px]">
          <div className="m-auto max-w-[1500px] px-4 py-4">
            <Header />
            <div className="mt-[56.9px] overflow-y-auto overflow-x-hidden">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default AppLayout;
