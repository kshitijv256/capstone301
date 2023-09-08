import React, { useContext, useEffect } from "react";
import Appbar from "../../components/Appbar";
import LiveGames from "../match/LiveGames";
import NewsSection from "../news";
import { UserContext } from "../../context/user";
import { me } from "../../utils/apiUtils";
import { User } from "../../types/user";

const fetchUser = async (setUser: (data: User) => void) => {
  const user: User = await me();
  setUser(user);
};

function Dashboard() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    fetchUser(setUser);
  }, []);
  return (
    <>
      <div className="h-screen overflow-y-auto no-scrollbar bg-gray-100 dark:bg-slate-800 m-0 p-0">
        <Appbar />
        <div className="flex w-full justify-center">
          <LiveGames />
        </div>
        <div className="py-2 px-4">
          <NewsSection />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
