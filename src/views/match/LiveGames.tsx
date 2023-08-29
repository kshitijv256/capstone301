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
    <div className="flex w-11/12 gap-2 overflow-x-scroll no-scrollbar">
      {matches?.matches.map((match) =>
        match.isRunning ? <LiveGamesTile key={match.id} id={match.id} /> : null
      )}
    </div>
  );
}

export default LiveGames;
