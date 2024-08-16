import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useEffect, useState } from "react";

function SideBar() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 top-0 grid-rows-[47px_1fr] border-r border-stone-200 px-4 py-2 sm:w-[200px]">
      <div className="hidden sm:block">
        <img src="/logo.png" alt="logo image" />
      </div>

      <ul className="mt-4 space-y-3">
        <NavItem
          to="/dashboard"
          title="Dashboard"
          icon={<i className="fa-solid fa-chart-line"></i>}
        />

        <NavItem
          to="/orders"
          title="Order"
          icon={<i className="fa-solid fa-bag-shopping"></i>}
        />

        <NavItem
          to="/products"
          icon={<i className="fa-solid fa-store"></i>}
          title="Product"
        >
          <ul className="ml-2 mt-2 space-y-1 transition-all">
            <div className="border-l-2 border-purple-500 px-3 py-1">
              <NavItem to="/products/new" size="sm" title="New Product" />
            </div>
            <div className="border-l-2 border-purple-500 px-3 py-1">
              <NavItem to="/products/category" size="sm" title="Category" />
            </div>
            <div className="border-l-2 border-purple-500 px-3 py-1">
              <NavItem to="/products/size" size="sm" title="Size" />
            </div>
          </ul>
        </NavItem>

        <NavItem
          to="/customers"
          icon={<i className="fa-solid fa-users"></i>}
          title="Customer"
        />

        <NavItem
          to="/discounts"
          icon={<i className="fa-solid fa-gift"></i>}
          title="Discount"
        />
      </ul>
    </div>
  );
}

function NavItem({ children, to, icon, title, size }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.split("/")[1] !== to.split("/")[1]) {
      setOpen(false);
      console.log(pathname.split("/")[1], to.split("/")[1]);
    }
  }, [pathname, to]);
  return (
    <li
      onClick={() => {
        setOpen((open) => !open);
      }}
    >
      <NavLink
        to={to}
        className={`flex w-full justify-between rounded-md px-3 py-2 text-[${size || "base"}] text-stone-700 transition-all`}
      >
        <p className="flex items-center space-x-2">
          <span className="">{icon}</span>
          <span className="hidden sm:block">{title}</span>
        </p>
        {children && (
          <span className="float-right">
            {!open ? (
              <i className="fa-solid fa-chevron-right"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </span>
        )}
      </NavLink>
      {open && children}
    </li>
  );
}
export default SideBar;
