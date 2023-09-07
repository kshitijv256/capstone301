import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../views/signin";
import Signup from "../views/signup";
import Logout from "../views/logout";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../views/dashboard";
// import SettingModal from "../views/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  // {
  //   path: "/",
  //   element: <Signin />,
  // },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    // children: [
    //   {
    //     index: true,
    //     element: <Navigate to="/dashboard" replace />,
    //   },
    //   {
    //     path: "settings",
    //     element: <SettingModal />,
    //   },
    // ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
export default router;
