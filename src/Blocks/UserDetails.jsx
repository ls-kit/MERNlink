import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const UserDetails = () => {
  return (
    <div>
      <div className="px-5 pt-5">
        <Link className="text-2xl flex items-end gap-1" to={"/allusers"}>
          <IoIosArrowDropleftCircle className="inline-block text-slate-700 hover:text-slate-900" />
          <span className="text-xs">Go back to All Users</span>
        </Link>
      </div>
      <p className="text-center">This is user details page</p>
    </div>
  );
};

export default UserDetails;
