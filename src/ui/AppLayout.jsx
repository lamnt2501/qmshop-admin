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
      <div className="ml-[200px]">
        <Header />
        <div className="mt-[46.9px] overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
