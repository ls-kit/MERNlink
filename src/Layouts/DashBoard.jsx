import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Toaster, toast } from "sonner";

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
    <div className="px-20 py-20 text-center">
      <Toaster position="top-center" richColors />
      <p>You have been redirected to dashboard after login</p>
      <button onClick={handleLogout} className="btn btn-active btn-neutral">
        Logout
      </button>
    </div>
  );
};

export default DashBoard;
