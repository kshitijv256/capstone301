import React, { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const Signin = React.lazy(() => import("../views/signin"));
const Signup = React.lazy(() => import("../views/signup"));
import Logout from "../views/logout";
// import ProtectedRoute from "./ProtectedRoute";
const Dashboard = React.lazy(() => import("../views/dashboard"));
const ResetPassword = React.lazy(() => import("../views/reset"));
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
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <Signin />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "reset",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ResetPassword />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
export default router;
