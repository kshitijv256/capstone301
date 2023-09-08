import React, { useEffect, useState } from "react";
import { Match } from "../../types/matches";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { getMatch } from "../../utils/apiUtils";
import { PlayCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import Loading from "../../components/Loading";

const getCurrentMatch =
  (id: number) => async (setMatchCB: (data: Match) => void) => {
    const data: Match = await getMatch(id);
    console.log(data);
    setMatchCB(data);
  };

function LiveGamesTile(props: {
  id: number;
  fav: boolean;
  isRunning: boolean;
}) {
  const { id, fav, isRunning } = props;
  const [match, setMatch] = useState<Match>();

  useEffect(() => {
    getCurrentMatch(id)(setMatch);
  }, [id]);

  const refresh = () => {
    getCurrentMatch(id)(setMatch);
    console.log(match);
  };

  if (!match) {
    return (
      <div
        className="flex flex-col items-center justify-center p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
    flex-grow-0 flex-shrink-0 w-64
    bg-white dark:bg-slate-700 dark:text-slate-300"
      >
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
      flex-grow-0 flex-shrink-0 w-64
      bg-white dark:bg-slate-700 dark:text-slate-300"
    >
      <div className="font-bold text-lg mb-1 flex justify-between w-full items-start">
        <span>
          <div className="flex gap-4 text-green-500 font-normal items-center text-base">
            {fav && (
              <span className="flex gap-1 items-center">
                <StarIcon className="w-5 h-5 text-green-500" />
                {"  Favorite"}
              </span>
            )}
            {isRunning && (
              <span className="flex gap-1 items-center">
                {<PlayCircleIcon className="w-5 h-5" />}Live
              </span>
            )}
          </div>
          {match.sportName}
        </span>
        <button>
          <ArrowPathIcon className="w-5 h-5" onClick={refresh} />
        </button>
      </div>
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
