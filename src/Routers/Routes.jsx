import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Blocks/Login";
import SignUp from "../Blocks/SignUp";
import DashBoard from "../Layouts/DashBoard";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
