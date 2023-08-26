import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
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
    </div>
  );
}

export default Dashboard;
