import { Avatar, Popover } from "@mui/material";
import BreadcrumbsCustom from "./BreadcrumbsCustom.jsx";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext.jsx";
import { useEffect, useState } from "react";

function Header() {
  const { dispatch, logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [inform, setInform] = useState({});

  useEffect(() => {
    setInform(JSON.parse(localStorage.getItem("inform")));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="fixed left-0 right-0 top-0 z-10 ml-[76px] flex items-center justify-between border-b border-stone-200 bg-white px-4 shadow-sm sm:ml-[200px]">
      <BreadcrumbsCustom />
      <div className="relative bg-gray-100 px-4 py-2 hover:cursor-pointer">
        <div className="flex items-center space-x-4" onClick={handleClick}>
          <Avatar
            src={inform.avtUrl}
            alt="Avatar image"
            sx={{
              width: 40,
              height: 40,
            }}
          >
            {name.split(" ").at(-1)[0]}
          </Avatar>
          <div>
            <p className="font-medium">{inform?.name}</p>
            <p className="text-sm">
              {inform.role?.[0] + inform.role?.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
        <Popover
          id={id}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <ul
            className={`min-w-[200px] rounded-md border border-stone-200 bg-white p-2`}
          >
            <li>
              <Link
                to="/me"
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
        </Popover>
      </div>
    </div>
  );
}

export default Header;
