import React, { useContext, useEffect, useState } from "react";
import { Sport, Sports } from "../../types/sports";
import { Article } from "../../types/articles";
import ArticleTile from "./ArticleTile";
import { getArticles, getSports } from "../../utils/apiUtils";
import Loading from "../../components/Loading";
import { UserContext } from "../../context/user";
import { User } from "../../types/user";

const fetchSports = async (setSportsCB: (data: any) => void) => {
  const data: Sports = await getSports();
  console.log(data);
  setSportsCB(data);
};

const fetchNews = async (setNewsCB: (data: Article[]) => void) => {
  const data: Article[] = await getArticles();
  console.log(data);
  setNewsCB(data);
};

const filteredNews = (news: Article[], sport: Sport) => {
  const list = news.filter((article) => {
    return article.sport.id === sport.id;
  });
  return list;
};

const filterFavorites = async (
  articles: Article[],
  setFavList: (data: Article[]) => void,
  user: User | null
) => {
  if (user) {
    const userSports = user.preferences.sports
      ? user?.preferences.sports.map((sport) => sport.name)
      : [];
    const userTeams = user.preferences.teams
      ? user?.preferences.teams.map((team) => team.id)
      : [];
    const filtered = articles.filter(
      (article) =>
        userSports.includes(article.sport.name) ||
        userTeams.includes(article.teams[0]?.id || article.teams[1]?.id)
    );
    setFavList(filtered);
  }
};

function NewsSection() {
  const { user } = useContext(UserContext);
  const [sports, setSports] = useState<Sports>();
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [news, setNews] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [favList, setFavList] = useState<Article[]>([]);
  const [showFav, setShowFav] = useState<boolean>(false);

  useEffect(() => {
    fetchSports(setSports);
    fetchNews(setNews);
  }, []);

  useEffect(() => {
    if (!showFav) {
      if (selectedSport && news) {
        const list = filteredNews(news, selectedSport);
        setFiltered(list);
      }
      if (selectedSport == null) {
        setFiltered(news || []);
      }
    } else {
      setFiltered(favList);
    }
  }, [selectedSport, news, showFav, favList]);

  useEffect(() => {
    filterFavorites(news, setFavList, user);
  }, [user, news]);

  if (!news) {
    return (
      <div
        className="flex flex-col items-center justify-center m-2 
    flex-grow-0 flex-shrink-0 w-full h-full"
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="m-4 text-green-600 text-3xl font-bold">Trending News</div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
        >
          <li key={0} className="mr-2">
            <button
              className={`${
                showFav ? "bg-green-400/30 dark:bg-green-600/30" : ""
              } inline-block p-4 rounded-t-lg text-green-600 hover:text-green-700 dark:hover:text-green-500`}
              id="profile-tab"
              type="button"
              onClick={() => setShowFav(true)}
            >
              Favorites
            </button>
          </li>
          <li key={"x"} className="mr-2">
            <button
              className={`${
                selectedSport === null && !showFav
                  ? "bg-green-400/30 dark:bg-green-600/30"
                  : ""
              } inline-block p-4 rounded-t-lg text-green-600 hover:text-green-700 dark:hover:text-green-500`}
              id="profile-tab"
              type="button"
              onClick={() => {
                setShowFav(false);
                setSelectedSport(null);
              }}
            >
              All Sports
            </button>
          </li>
          {sports?.sports.map((sport) => (
            <li key={sport.id} className="mr-2">
              <button
                className={`${
                  selectedSport === sport && !showFav
                    ? "bg-green-400/30 dark:bg-green-600/30"
                    : ""
                } inline-block p-4 rounded-t-lg text-green-600 hover:text-green-700 dark:hover:text-green-500`}
                id="profile-tab"
                type="button"
                onClick={() => {
                  setShowFav(false);
                  setSelectedSport(sport);
                }}
              >
                {sport.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[80vh] overflow-y-scroll no-scrollbar">
        {filtered.length > 0 ? (
          filtered?.map((article) => (
            <ArticleTile key={article.id} article={article} />
          ))
        ) : (
          <div className="text-center text-gray-400">
            {showFav
              ? "No Favorites seleted, Go to settings to set"
              : "No news available"}
          </div>
        )}
      </div>
    </>
  );
}

export default NewsSection;
