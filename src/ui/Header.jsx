import { Avatar } from "@mui/material";
import BreadcrumbsCustom from "./BreadcrumbsCustom.jsx";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext.jsx";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const { dispatch, logout } = useAuthContext();

  return (
    <div className="fixed left-0 right-0 top-0 z-10 ml-[84px] flex items-center justify-between border-b border-stone-200 bg-white px-4 py-2 shadow-sm sm:ml-[200px]">
      <BreadcrumbsCustom />
      <div className="relative" onClick={() => setOpen((open) => !open)}>
        <Avatar
          src="/avatar-default.svg"
          alt="Avatar image"
          className="border border-stone-800 hover:cursor-pointer"
          sx={{
            width: 30,
            height: 30,
          }}
        ></Avatar>
        <ul
          className={`absolute right-0 min-w-[200px] rounded-md border border-stone-200 bg-white p-2 ${open ? "" : "hidden"}`}
        >
          <li>
            <Link
              to="me"
              className="inline-block w-full border-b border-stone-200 p-1"
            >
              Trang Cá Nhân
            </Link>
          </li>
          <li>
            <Link
              className="inline-block w-full p-1"
              onClick={() => dispatch(logout())}
            >
              Đăng Xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
