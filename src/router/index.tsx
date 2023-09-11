import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../views/signin";
import Signup from "../views/signup";
import Logout from "../views/logout";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../views/dashboard";
import ResetPassword from "../views/reset";
import ProtectedRoute from "./ProtectedRoute";
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
    path: "reset",
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
export default router;
