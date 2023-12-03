import React, { useContext } from "react";
import { AuthContext } from "../Poveiders/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  // redirect user to dashboard if loggedin
  if (user) {
    return children;
  }

  return <Navigate to={"/"} replace></Navigate>;
};

export default PrivateRoute;
