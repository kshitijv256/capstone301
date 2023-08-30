import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Sport, Sports } from "../../types/sports";
import { Article } from "../../types/articles";

const fetchSports = async (setSportsCB: (data: any) => void) => {
  const response = await fetch(`${API_ENDPOINT}/sports`);
  const data: Sports = await response.json();
  console.log(data);
  setSportsCB(data);
};

const fetchNews = async (setNewsCB: (data: Article[]) => void) => {
  const response = await fetch(`${API_ENDPOINT}/articles`);
  const data: Article[] = await response.json();
  console.log(data);
  setNewsCB(data);
};

function NewsSection() {
  const [sports, setSports] = useState<Sports>();
  const [selectedSport, setSelectedSport] = useState<Sport>();
  const [news, setNews] = useState<Article[]>();
  const [filtered, setFiltered] = useState<Article[]>([]);

  const filteredNews = (news: Article[], sport: Sport) => {
    const list = news.filter((article) => {
      return article.sport.id === sport.id;
    });
    console.log(list);
    return list;
  };

  useEffect(() => {
    fetchSports(setSports);
    fetchNews(setNews);
  }, []);

  useEffect(() => {
    console.log(news);
    if (selectedSport && news) {
      const list = filteredNews(news, selectedSport);
      setFiltered(list);
    }
  }, [selectedSport, news]);

  return (
    <>
      <div className="m-4 text-lime-600 text-4xl font-bold">Trending News</div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
        >
          {sports?.sports.map((sport) => (
            <li className="mr-2">
              <button
                className="inline-block p-4 rounded-t-lg text-lime-600"
                id="profile-tab"
                type="button"
                onClick={() => setSelectedSport(sport)}
              >
                {sport.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-h-[70vh] h-fit overflow-y-scroll no-scrollbar">
        {filtered?.map((article) => (
          <div
            className="flex flex-col p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
            flex-grow-0 flex-shrink-0 w-54
            bg-grey-200 dark:bg-slate-700 dark:text-slate-300"
          >
            <p className="font-bold text-lg mb-1 flex justify-between w-full items-center">
              {article.title}
            </p>
            <p className="my-1">{article.sport.name}</p>
            <p className="my-1">{article.summary}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsSection;
