import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Article } from "../../types/articles";
import { API_ENDPOINT } from "../../config/constants";
import { XCircleIcon } from "@heroicons/react/24/outline";

const fetchArticle = async (
  id: number,
  setArticleData: (data: Article) => void
) => {
  const response = await fetch(`${API_ENDPOINT}/articles/${id}`);
  const data: Article = await response.json();
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
                      <div className="flex justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100"
                        >
                          {articleData.title}
                        </Dialog.Title>
                        <button type="button" onClick={() => setOpen(false)}>
                          <XCircleIcon className="w-10 h-10 stroke-slate-800 dark:stroke-slate-200" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-lg text-gray-500 dark:text-gray-200">
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
