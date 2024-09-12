import { Link, NavLink } from "react-router-dom";
import { memo, useState } from "react";
import PropTypes from "prop-types";

function SideBar() {
  return (
    <div className="fixed bottom-0 left-0 top-0 z-50 grid-rows-[47px_1fr] border-r border-stone-200 bg-white px-4 py-2 sm:w-[200px]">
      <div>
        <Link>
          <img
            className="hidden sm:block"
            src="/logo.png"
            alt="logo image"
            to="/dashboard"
          />
          <p className="text-center font-mono text-[30px] font-semibold sm:hidden">
            QM
          </p>
        </Link>
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
        >
          {/* <ul className="ml-2 mt-2 space-y-1 transition-all">
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/new"
                size="sm"
                title="New Product"
                icon={<i className="fa-solid fa-truck-fast"></i>}
              />
            </div>
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/category"
                size="sm"
                title="Category"
                icon={<i className="fa-solid fa-truck-fast"></i>}
              />
            </div>
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/size"
                size="sm"
                title="Size"
                icon={<i className="fa-solid fa-truck-fast"></i>}
              />
            </div>
          </ul> */}
        </NavItem>

        <NavItem
          to="/products"
          icon={<i className="fa-solid fa-store"></i>}
          title="Product"
        >
          <ul className="ml-2 mt-2 space-y-1 transition-all">
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/new"
                size="sm"
                title="New Product"
                icon={<i className="fa-solid fa-plus"></i>}
              />
            </div>
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/sizes"
                size="sm"
                title="Size"
                icon={<i className="fa-solid fa-s"></i>}
              />
            </div>
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/colors"
                size="sm"
                title="Color"
                icon={<i className="fa-solid fa-palette"></i>}
              />
            </div>
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/brands"
                size="sm"
                title="Brand"
                icon={<i className="fa-solid fa-b"></i>}
              />
            </div>
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/products/categories"
                size="sm"
                title="Category"
                icon={<i className="fa-solid fa-c"></i>}
              />
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
        >
          <ul className="ml-2 mt-2 space-y-1 transition-all">
            <div className="border-l-2 border-purple-500 px-2">
              <NavItem
                to="/discounts/new"
                size="sm"
                title="New Discount"
                icon={<i className="fa-solid fa-plus"></i>}
              />
            </div>
          </ul>
        </NavItem>
      </ul>
    </div>
  );
}

const NavItem = memo(
  function NavItem({ children, to, icon, title, size }) {
    const [open, setOpen] = useState(true);

    return (
      <li>
        <NavLink
          to={to}
          className={`flex w-full justify-center rounded-md px-3 py-2 text-stone-700 transition-colors hover:ring-1 hover:ring-main sm:justify-between`}
        >
          <p className={`flex items-center space-x-2 text-${size || "base"}`}>
            <span className="">{icon}</span>
            <span className="hidden sm:block">{title}</span>
          </p>
          {children && (
            <p
              className="float-right pl-4"
              onClick={(e) => {
                e.preventDefault();
                setOpen((o) => !o);
              }}
            >
              {!open ? (
                <i className="fa-solid fa-chevron-right"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </p>
          )}
        </NavLink>
        {open && children}
      </li>
    );
  },
  () => {
    return true;
  },
);

NavItem.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
  icon: PropTypes.object,
  title: PropTypes.any,
};

export default SideBar;
