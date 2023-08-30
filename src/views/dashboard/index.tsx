import React from "react";
import Appbar from "../../components/Appbar";
import LiveGames from "../match/LiveGames";
import NewsSection from "../news";

function Dashboard() {
  return (
    <>
      <div className="min-h-screen h-full overflow-scroll no-scrollbar dark:bg-slate-800 m-0 p-0">
        <Appbar />
        <div className="flex w-full justify-center">
          <LiveGames />
        </div>
        <NewsSection />
      </div>
    </>
  );
}

export default Dashboard;
