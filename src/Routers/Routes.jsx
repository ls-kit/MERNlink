import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Blocks/Login";
import SignUp from "../Blocks/SignUp";
import DashBoard from "../Layouts/DashBoard";
import PrivateRoute from "./PrivateRoute";
import ReqBackLink from "../Blocks/ReqBackLink";
import OfferLink from "../Blocks/OfferLink";
import MarketPlace from "../Blocks/MarketPlace";
import NewsLetter from "../Blocks/NewsLetter";
import Notifications from "../Blocks/Notifications";
import MangeUsers from "../Blocks/MangeUsers";
import AdminRoute from "./AdminRoute";

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
        children: [
          {
            path: "/req-link",
            element: <ReqBackLink />,
          },
          {
            path: "/offer-link",
            element: <OfferLink />,
          },
          {
            path: "/marketplace",
            element: <MarketPlace />,
          },
          {
            path: "/newsletter",
            element: <NewsLetter />,
          },
          {
            path: "/notifications",
            element: <Notifications />,
          },
          {
            path: "/manageusers",
            element: (
              <AdminRoute>
                <MangeUsers />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
