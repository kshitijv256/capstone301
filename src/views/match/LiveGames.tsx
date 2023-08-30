import React, { useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Matches } from "../../types/matches";
import LiveGamesTile from "./LiveGamesTile";

const getMatches = async (setMatchesCB: (data: Matches) => void) => {
  const response = await fetch(`${API_ENDPOINT}/matches`);
  const data: Matches = await response.json();
  console.log(data);
  setMatchesCB(data);
};

function LiveGames() {
  const [matches, setMatches] = React.useState<Matches>();
  useEffect(() => {
    getMatches(setMatches);
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl text-lime-600 font-bold text-left w-full ml-8 my-2">
        Live Matches
      </h1>
      <div className="flex w-11/12 gap-2 overflow-x-scroll no-scrollbar">
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
