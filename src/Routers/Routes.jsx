import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Blocks/Login";
import SignUp from "../Blocks/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
