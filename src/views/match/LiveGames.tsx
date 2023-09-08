import React, { useContext, useEffect } from "react";
import { Match, Matches } from "../../types/matches";
import LiveGamesTile from "./LiveGamesTile";
import { getMatches } from "../../utils/apiUtils";
import { UserContext } from "../../context/user";

const fetchMatches = async (setMatchesCB: (data: Matches) => void) => {
  const data: Matches = await getMatches();
  setMatchesCB(data);
};

function LiveGames() {
  const userData = useContext(UserContext);
  console.log("userData", userData);
  const [matches, setMatches] = React.useState<Matches>({ matches: [] });
  const [filteredMatches, setFilteredMatches] = React.useState<Match[]>([]);
  const [remainingMatches, setRemainingMatches] = React.useState<Match[]>([]);

  useEffect(() => {
    fetchMatches(setMatches);
  }, []);

  const filterMatches = () => {
    if (userData.user) {
      const userSports = userData.user.preferences.sports
        ? userData?.user?.preferences.sports.map((sport) => sport.name)
        : [];
      const userTeams = userData.user.preferences.teams
        ? userData?.user?.preferences.teams.map((team) => team.id)
        : [];
      const filtered = matches.matches.filter(
        (match) =>
          userSports.includes(match.sportName) ||
          userTeams.includes(match.teams[0].id || match.teams[1].id)
      );
      const remaining = matches.matches.filter(
        (match) => !filtered.includes(match)
      );
      setFilteredMatches(filtered);
      setRemainingMatches(remaining);
    }
  };

  useEffect(() => {
    filterMatches();
  }, [matches, userData]);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h1 className="text-4xl text-lime-600 font-bold text-left w-full ml-8 my-2">
        Trending Games
      </h1>
      <div className="flex w-full gap-2 overflow-x-scroll no-scrollbar">
        {userData.user ? (
          <>
            {filteredMatches.map((match) => (
              <LiveGamesTile
                key={match.id}
                fav={true}
                isRunning={match.isRunning}
                id={match.id}
              />
            ))}
            {remainingMatches.map((match) => (
              <LiveGamesTile
                key={match.id}
                fav={false}
                isRunning={match.isRunning}
                id={match.id}
              />
            ))}
          </>
        ) : (
          <>
            {matches.matches.map((match) => (
              <LiveGamesTile
                key={match.id}
                fav={false}
                isRunning={match.isRunning}
                id={match.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default LiveGames;
