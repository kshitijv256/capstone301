import React, { useEffect } from "react";
import { Matches } from "../../types/matches";
import LiveGamesTile from "./LiveGamesTile";
import { getMatches } from "../../utils/apiUtils";

const fetchMatches = async (setMatchesCB: (data: Matches) => void) => {
  const data: Matches = await getMatches();
  console.log(data);
  setMatchesCB(data);
};

function LiveGames() {
  const [matches, setMatches] = React.useState<Matches>();
  useEffect(() => {
    fetchMatches(setMatches);
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl text-lime-600 font-bold text-left w-full ml-8 my-2">
        Live Matches
      </h1>
      <div className="flex px-4 w-full gap-2 overflow-x-scroll no-scrollbar">
        {matches?.matches.map((match) =>
          match.isRunning ? (
            <LiveGamesTile key={match.id} id={match.id} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default LiveGames;
