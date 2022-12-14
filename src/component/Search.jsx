import React, { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsCalendar2WeekFill } from "react-icons/bs";
import Example from "./WorkType";
import WorkType from "./WorkType";
import FooterComponent from "./FooterComponent";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import SearchLocationInput from "./SearchLocationInput";
import Country from "./Country";
import { Listbox, Transition } from "@headlessui/react";

import { Jobs as jobs } from "./jobs";

const Search = () => {
  const countries = ["AU", "NZ", "CA"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);

  function isSelected(value) {
    return selectedCountries.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedCountriesUpdated = [
        ...selectedCountries,
        countries.find((el) => el === value),
      ];
      setSelectedCountries(selectedCountriesUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedCountriesUpdated = selectedCountries.filter(
      (el) => el !== value
    );
    setSelectedCountries(selectedCountriesUpdated);
    setIsOpen(true);
  }

  // *******************************************************

  // useEffect(() => {
  //   fetch("http://localhost:5000")
  //     .then((response) => response.json())
  //     .then((data) => setJobs(data));
  // }, []);
  let lastItem = 10;
  // const [jobs, setJobs] = useState([]);
  const [showMore, setShowMore] = useState(10);
  const [searchField, setSearchField] = useState("");
  const [categorySearchField, setCategorySearchField] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const newFilteredJobs = jobs.filter((job) => {
      //   console.log(job.country.toString() === selectedCountries.toString());
      let filtered = job.title.toString().toLocaleLowerCase().includes(searchField) &&
        job.category
          .toString()
          .toLocaleLowerCase()
          .includes(categorySearchField)
          //    &&
          // job.country.toString() === selectedCountries.toString()
      if (jobTypes.length) {
        filtered  = filtered && jobTypes.includes(job?.jobType?.[0] || "")
      }
      return filtered;
    });
    setFilteredJobs(newFilteredJobs);
  }, [jobs, searchField, categorySearchField, jobTypes]);

  //   useEffect(() => {
  //     const newFilteredJobs = jobs.filter((job) => {
  //       return job.category
  //         .toString()
  //         .toLocaleLowerCase()
  //         .includes(categorySearchField);
  //     });
  //     setFilteredJobs(newFilteredJobs);
  //   }, [jobs, categorySearchField]);
  //   const newFilteredJobsByType = jobs.filter((job) => {
  //     return job.jobType.toString().includes();
  //   });

  const filterJobsByTypeHandler = (_jobTypes) => {
    setJobTypes(_jobTypes)
    console.log(
      `selected job types are ${jobTypes} and jobtype type is ${typeof jobTypes} jobtype length is ${
        jobTypes.length
      }`
    );
    // const newFilteredJobs = jobs.filter((job) => {
    //   for (let i = 0; i < jobTypes.length; i++) {
    //     if (job.jobType !== undefined) {
    //       return job.jobType.toString() === jobTypes[i];
    //     }
    //   }
    // });
    // setFilteredJobs(newFilteredJobs);
  };

  return (
    <div>
      <img className="w-64 p-6" src={require("../assets/logo2.png")} alt="" />
      <div className="">
        <img
          src={require("../assets/background.webp")}
          className="object-cover h-96 w-full lg:h-60 md:h-48"
          alt=""
        />
      </div>
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-extrabold">
          We believe everyone deserves to live the career they love.
        </h1>
        <h2 className="text-2xl mt-3 font-medium text-gray-600">
          Make our vision your reality, let's talk!
        </h2>
      </div>

      {/*************************** Search Component Start **************************/}
      <div
        className="mx-8 mt-10 text-lg flex-col max-w-6xl justify-start
         items-start ml-auto mr-auto lg:max-w-4xl"
      >
        <div>
          <h1 className="font-extrabold text-2xl ml-5">Job search</h1>
        </div>
        <div className="w-full max-w-screen-xl">
          <div className="justify-center py-10">
            <div className="w-full max-w-6xl lg:max-w-4xl lg:mx-auto">
              <div className="bg-white border rounded-sm rounded-b-none px-3 py-2 pb-3 flex flex-row md:flex-col md:rounded-none">
                <div className="flex-auto border-r md:border-r-0">
                  <div className="block tracking-widest text-gray-700 font-bold my-2 px-2 font-mukta uppercase">
                    What
                  </div>
                  <div className="items-center bg-gray-200 rounded-md">
                    <input
                      className="w-full rounded-md placeholder-gray-400 text-gray-700 leading-tight focus:outline-none py-2 px-2  md:placeholder:text-sm lg:placeholder:text-sm"
                      id="search"
                      type="text"
                      placeholder="Enter keyword of role name"
                      onChange={(event) => {
                        const searchFieldString = event.target.value
                          .toString()
                          .toLocaleLowerCase();
                        setSearchField(searchFieldString);
                      }}
                    />
                  </div>
                </div>
                <div className="flex-auto md:border-r-0">
                  <div className="block tracking-widest text-gray-700 font-bold my-2 px-2 font-mukta uppercase">
                    Category
                  </div>
                  <div className="items-center bg-gray-200 rounded-md">
                    <input
                      className="w-full rounded-md placeholder-gray-400 text-gray-700 leading-tight focus:outline-none py-2 px-2  md:placeholder:text-xs lg:placeholder:text-sm"
                      id="search"
                      type="text"
                      placeholder="Search Head Office, Optometrist, Partnership or Retail"
                      onChange={(event) => {
                        const searchFieldString = event.target.value
                          .toString()
                          .toLocaleLowerCase();
                        setCategorySearchField(searchFieldString);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border border-t-0  rounded-sm rounded-t-none px-auto py-auto pl-1 mb-4 pb-3 flex flex-row md:flex-col">
                {/* <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 bg-gray-400"
                ></label>
                <select
                  id="countries"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                >
                  <option selected>All Work Types</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select> */}
                <WorkType
                  jobs={jobs}
                  onFilterJobsByType={filterJobsByTypeHandler}
                />
                <div className="flex w-1/2 pr-2">
                  <div className="w-full mt-2">
                    <Listbox
                      as="div"
                      className="space-y-1"
                      value={selectedCountries}
                      onChange={(value) => handleSelect(value)}
                      open={isOpen}
                    >
                      {() => (
                        <>
                          <div className="relative md:mb-2  ">
                            <span className="inline-block w-full rounded-md shadow-sm">
                              <Listbox.Button
                                className="cursor-default relative w-full rounded-sm border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={() => setIsOpen(!isOpen)}
                                open={isOpen}
                              >
                                <span className="block truncate">
                                  {selectedCountries.length < 1
                                    ? "Select Country"
                                    : `${selectedCountries}`}
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
                                className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5"
                              >
                                {countries.map((country) => {
                                  const selected = isSelected(country);
                                  return (
                                    <Listbox.Option
                                      key={country}
                                      value={country}
                                    >
                                      {({ active }) => (
                                        <div
                                          className={`${
                                            active
                                              ? "text-white bg-blue-600"
                                              : "text-gray-900"
                                          } cursor-default select-none relative py-2 pl-8 pr-4`}
                                        >
                                          <span
                                            className={`${
                                              selected
                                                ? "font-semibold"
                                                : "font-normal"
                                            } block truncate`}
                                          >
                                            {country}
                                          </span>
                                          {selected && (
                                            <span
                                              className={`${
                                                active
                                                  ? "text-white"
                                                  : "text-blue-600"
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
                {/* <SearchLocationInput />
                 */}
                {/* <WorkType jobs={jobs} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*************************** Search Component End **************************/}

      <div>
        <div
          className="mx-8 mt-10 text-lg flex max-w-6xl justify-start
         items-start ml-auto mr-auto lg:max-w-4xl lg:px-2 md:max-w-2xl md:px-1"
        >
          <p>
            Showing{" "}
            <span className="font-bold">
              {showMore > filteredJobs.length ? filteredJobs.length : showMore}
            </span>{" "}
            of {filteredJobs.length}
          </p>
        </div>

        <ul className="mt-8">
          {filteredJobs.slice(0, showMore).map((job) => {
            return (
              <a href={job.url} key={job.referenceNumber}>
                <div className="md:px-1 lg:px-2">
                  <div className="border mx-8 mb-4 flex max-w-6xl justify-center items-center ml-auto mr-auto hover:border-black hover:bg-gray-50 lg:max-w-4xl md:max-w-2xl">
                    <div className="m-5  w-9/12 align-middld md:mx-0">
                      <li className="p-5 font-bold text-xl lg:text-base md:text-sm">
                        {job.title}
                      </li>
                    </div>
                    <div className="mr-auto text-xs mb-5 pr-10 whitespace-nowrap lg:w-44 lg:mr-10">
                      <div className="flex ml-auto mt-5 lg:mt-4">
                        <div className="mr-4 mt-0.5">
                          <HiLocationMarker />
                        </div>
                        <div className="text-gray-600 whitespace-nowrap">
                          <span className="mr-0.5">
                            {job.city ? job.city : job.country}{" "}
                          </span>
                          <span> {job.state} </span>
                          <span>{job.postalCode}</span>
                        </div>
                      </div>

                      <div className="flex ml-auto mt-5 lg:mt-4 lg:text-right">
                        <div className="mr-4 mt-0.5">
                          <AiTwotoneCalendar />
                        </div>
                        <div className="text-gray-600 mr-5">
                          <span>
                            {job.jobType ? job.jobType : "Any Employment"}
                          </span>
                        </div>
                      </div>

                      <div className="flex ml-auto mt-5  lg:mt-4">
                        <div className="mr-4 mt-0.5">
                          <BsCalendar2WeekFill />
                        </div>
                        <div className="text-gray-600 mr-5">
                          <span>{job.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col mx-8 mb-4 max-w-6xl justify-center items-center ml-auto mr-auto lg:px-2">
        <button
          onClick={() => {
            lastItem = lastItem + 10;
            setShowMore(showMore + 10);
          }}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-4 w-full mb-6 border border-blue-500 hover:border-transparent rounded flex items-center justify-center ${
            showMore >= filteredJobs.length ? "cursor-not-allowed" : ""
          } lg:max-w-4xl md:max-w-2xl md:w-full md:mx-1`}
        >
          Show more jobs
        </button>
        <FooterComponent />
      </div>
    </div>
  );
};

export default Search;
