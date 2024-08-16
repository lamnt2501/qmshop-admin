import { useAuthContext } from "../contexts/authContext";

function SideBar() {
  return (
    <div className="fixed bottom-0 left-0 top-0 w-[200px] border-r border-stone-200 px-4 py-2">
      <img src="/logo.png" alt="logo image" />
    </div>
  );
}

export default SideBar;
