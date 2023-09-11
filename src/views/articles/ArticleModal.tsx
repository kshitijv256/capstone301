import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Article } from "../../types/articles";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { getArticle } from "../../utils/apiUtils";

const fetchArticle = async (
  id: number,
  setArticleData: (data: Article) => void
) => {
  const data: Article = await getArticle(id);
  setArticleData(data);
};

export default function ArticleModal(prop: {
  article: Article;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { article, open, setOpen } = prop;
  const [articleData, setArticleData] = useState<Article>(article);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    fetchArticle(article.id, setArticleData);
  }, [article.id]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[80vw]">
                <div className="bg-white dark:bg-slate-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="flex w-full">
                        <div
                          className="w-full h-96 shrink-0 mr-4 rounded-"
                          style={{
                            backgroundImage:
                              "url(" + articleData.thumbnail + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {/* <img
                            src={articleData.thumbnail}
                            alt={articleData.sport.name}
                            className="object-cover w-full h-full rounded-md"
                          /> */}
                          <button
                            type="button"
                            className="right-0 top-0 absolute p-2"
                            onClick={() => setOpen(false)}
                          >
                            <XCircleIcon className="w-10 h-10 stroke-slate-800 dark:stroke-slate-200" />
                          </button>
                        </div>
                      </div>
                      <div className="flex w-full justify-center">
                        <div className="flex flex-col w-4/5 justify-between mt-[-80px] bg-white dark:bg-slate-700 z-20 relative rounded-md p-4">
                          <Dialog.Title
                            as="h3"
                            className="text-2xl mb-2 font-semibold leading-6 text-gray-900 dark:text-gray-100"
                          >
                            {articleData.title}
                          </Dialog.Title>
                          <p className="my-2 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-200 w-min whitespace-nowrap">
                            {articleData.sport.name}
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 italic my-1">
                            {new Date(articleData.date).toUTCString()}
                          </p>
                          {articleData.teams.length === 2 ? (
                            <p className="text-gray-800 dark:text-gray-200 mt-2">
                              Match Between:{" "}
                              <span className="font-semibold">
                                {articleData.teams[0].name +
                                  " & " +
                                  articleData.teams[1].name}
                              </span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="my-4">
                        <p className="text-lg text-gray-700 dark:text-gray-200 first-letter:text-3xl tracking-wide">
                          {articleData.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
