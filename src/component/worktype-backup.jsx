import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

const people = [
  "Full Time - Permanent",
  "Full Time - Fixed Term",
  "Part Time - Permanent",
  "Part Time - Fixed Term",
  "Contract",
  "Casual",
];
const jobTypes = [
  {
    jobType: "Full Time - Permanent",
    number: 0,
  },
  {
    jobType: "Full Time - Fixed Term",
    number: 0,
  },
  {
    jobType: "Part Time - Permanent",
    number: 0,
  },
  {
    jobType: "Part Time - Fixed Term",
    number: 0,
  },
  {
    jobType: "Contract",
    number: 0,
  },
  {
    jobType: "Casual",
    number: 0,
  },
];

export default function WorkType({ jobs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState([]);

  function isSelected(value) {
    return selectedPersons.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedPersonsUpdated = [
        ...selectedPersons,
        people.find((el) => el === value),
      ];
      setSelectedPersons(selectedPersonsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedPersonsUpdated = selectedPersons.filter((el) => el !== value);
    setSelectedPersons(selectedPersonsUpdated);
    setIsOpen(true);
  }

  return (
    <div className="flex w-1/2 pr-2">
      <div className="w-full mt-2 ">
        <Listbox
          as="div"
          className="space-y-1"
          value={selectedPersons}
          onChange={(value) => handleSelect(value)}
          open={isOpen}
        >
          {() => (
            <>
              {/* <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                Work Types
              </Listbox.Label> */}
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button
                    className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                    open={isOpen}
                  >
                    <span className="block truncate">
                      {selectedPersons.length < 1
                        ? "All Work Types"
                        : selectedPersons.length > 3
                        ? `${selectedPersons.length} Work Types Selected`
                        : `${selectedPersons.join(", ")}`}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {people.map((person) => {
                      let number = 0;
                      const selected = isSelected(person);
                      return (
                        <Listbox.Option key={person} value={person}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-slate-100"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-8 pr-4  hover:cursor-pointer hover:bg-slate-100`}
                            >
                              <span
                                className={`${
                                  selected ? "font-bold" : "font-normal"
                                } block truncate `}
                              >
                                {person}
                                <span className="inset-y-0 right-0 absolute mr-10 mt-2 font-normal">
                                  {number}
                                </span>
                              </span>

                              {/* <span className="flex-row">2</span> */}
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-blue-600"
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}
