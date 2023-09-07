import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import DropDown from "./Dropdown";
import { getSports, getTeams } from "../../utils/apiUtils";
import { Sport, Sports } from "../../types/sports";
import { Team } from "../../types/matches";

const fetchSports = async (setSports: (data: Sport[]) => void) => {
  const response = await getSports();
  const sports: Sports = await response.json();
  setSports(sports.sports);
};

const fetchTeams = async (setTeams: (data: Team[]) => void) => {
  const response = await getTeams();
  const teams: Team[] = await response.json();
  setTeams(teams);
};

function SettingModal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { open, setOpen } = props;
  const cancelButtonRef = useRef(null);

  const [sports, setSports] = useState<Sport[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchSports(setSports);
    fetchTeams(setTeams);
  }, []);

  return (
    <div>
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
                          <div className="flex w-full justify-between items-start">
                            <div className="flex flex-col">
                              <Dialog.Title
                                as="h3"
                                className="text-2xl mb-2 font-semibold leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Settings
                              </Dialog.Title>
                              <div className="h-96">
                                <p>Selected Sports</p>
                                <DropDown list={sports} selectedList={[]} />
                                <p>Selected Teams</p>
                                <DropDown list={teams} selectedList={[]} />
                              </div>
                            </div>
                          </div>
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
    </div>
  );
}

export default SettingModal;
