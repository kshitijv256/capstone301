import React, { useState } from "react";
import { Article } from "../../types/articles";
import ArticleModal from "./ArticleModal";

function ArticleTile(prop: { article: Article }) {
  const [open, setOpen] = useState(false);
  const { article } = prop;
  return (
    <div
      className="flex rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
            flex-grow-0 flex-shrink-0 
            bg-grey-200 dark:bg-slate-700 dark:text-slate-300"
      onClick={() => setOpen(true)}
    >
      <div className="w-48 h-48 shrink-0">
        <img
          src={article.thumbnail}
          alt={article.sport.name}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="flex flex-col p-4">
        <p className="mb-1 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 w-min whitespace-nowrap">
          {article.sport.name}
        </p>
        <p className="font-bold text-lg mb-1 flex justify-between w-full items-center">
          {article.title}
        </p>
        <p className="my-1">{article.summary}</p>
      </div>
      <ArticleModal article={article} open={open} setOpen={setOpen} />
    </div>
  );
}

export default ArticleTile;
