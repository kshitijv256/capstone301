import React from "react";
import Appbar from "../../components/Appbar";

function Dashboard() {
  return (
    <>
      <div className="h-screen dark:bg-slate-800 m-0 p-0">
        <Appbar />
        <h1 className="text-5xl font-bold text-lime-600 m-2">Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;
