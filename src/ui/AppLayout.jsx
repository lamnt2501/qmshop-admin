import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Loader from "./Loader";
function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      <SideBar />
      <div className="ml-[84px] min-h-[100dvh] bg-gray-100 px-4 py-4 sm:ml-[200px]">
        <div className="m-auto max-w-[1500px]">
          <Header />
          <div className="mt-[46.9px] overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
