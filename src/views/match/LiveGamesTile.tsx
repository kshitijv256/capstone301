import React, { useEffect, useState } from "react";
import { Match } from "../../types/matches";
import { API_ENDPOINT } from "../../config/constants";

const getCurrentMatch =
  (id: number) => async (setMatchCB: (data: Match) => void) => {
    const response = await fetch(`${API_ENDPOINT}/matches/${id}`);
    const data: Match = await response.json();
    console.log(data);
    setMatchCB(data);
  };

function LiveGamesTile(props: { id: number }) {
  const { id } = props;
  const [match, setMatch] = useState<Match>();

  useEffect(() => {
    getCurrentMatch(id)(setMatch);
  }, [id]);

  if (!match) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="flex flex-col p-2 rounded-md shadow-md flex-grow-0 flex-shrink-0 w-48
      bg-grey-200 dark:bg-slate-600 dark:text-slate-300"
    >
      <h1 className="font-bold text-lg">{match.sportName}</h1>
      <p className="">{match.location}</p>
      {Object.keys(match.score).map((key) => (
        <p key={key} className="flex w-full justify-between">
          <span>
            <b>{key}</b>
          </span>
          <span>{match.score[key as keyof Match]}</span>
        </p>
      ))}
    </div>
  );
}

export default LiveGamesTile;
