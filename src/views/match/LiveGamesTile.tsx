import React, { useEffect, useState } from "react";
import { Match } from "../../types/matches";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

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

  const refresh = () => {
    getCurrentMatch(id)(setMatch);
    console.log(match);
  };

  if (!match) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="flex flex-col p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
      flex-grow-0 flex-shrink-0 w-56
      bg-grey-200 dark:bg-slate-700 dark:text-slate-300"
    >
      <p className="font-bold text-lg mb-1 flex justify-between w-full items-center">
        {match.sportName}
        <button>
          <ArrowPathIcon className="w-5 h-5" onClick={refresh} />
        </button>
      </p>
      <p className="my-1">{match.location}</p>
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
