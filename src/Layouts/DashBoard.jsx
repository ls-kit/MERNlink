import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Toaster, toast } from "sonner";
import { Link, Outlet } from "react-router-dom";
import PageBanner from "../Componetns/PageBanner";

const DashBoard = () => {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then((res) => {
        toast.success(`Signed out successfully`);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };
  return (
    <div>
      <Toaster position="top-center" richColors />
      <PageBanner
        pagetitle={"Manage Your Actions"}
        pageDesc={"Browse all the category"}
      />

      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet />
          <div className="px-20 py-20 text-center">
            <p>You have been redirected to dashboard after login</p>
          </div>
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button lg:hidden block"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu px-4 pt-10 w-fit h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to={"/req-link"}>Request Backlink</Link>
            </li>
            <li>
              <Link to={"/offer-link"}>Offer Backlink</Link>
            </li>
            <li>
              <Link to={"/marketplace"}>Market Place</Link>
            </li>
            <div className="divider"></div>
            <li onClick={handleLogout} className="btn btn-active btn-neutral">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
