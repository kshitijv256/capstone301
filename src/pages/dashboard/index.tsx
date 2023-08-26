import React from "react";
import { Link } from "react-router-dom";
import Appbar from "../../components/Appbar";

function Dashboard() {
  return (
    <>
      <Appbar />
      <h1>Dashboard</h1>
      <button className="bg-blue-400 rounded p-2 shadow-md">
        <Link
          to={{
            pathname: "/logout",
          }}
        >
          Logout
        </Link>
      </button>
    </>
  );
}

export default Dashboard;
