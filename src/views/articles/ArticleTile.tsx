import React from "react";
import { Article } from "../../types/articles";

function ArticleTile(prop: { article: Article }) {
  const { article } = prop;
  return (
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
  );
}

export default ArticleTile;
