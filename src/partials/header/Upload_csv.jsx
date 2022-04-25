import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";

function Upload_csv() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex ml-3">
      <button
        ref={trigger}
        className={`px-3 w-full h-12 inline-flex items-center text-sm  font-medium justify-center bg-white hover:bg-slate-200 transition duration-150 rounded-2xl ${
          dropdownOpen && "bg-white"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <svg
          width="14"
          height="17"
          viewBox="0 0 14 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M5 13H9C9.55 13 10 12.55 10 12V7H11.59C12.48 7 12.93 5.92 12.3 5.29L7.71 0.700001C7.32 0.310001 6.69 0.310001 6.3 0.700001L1.71 5.29C1.08 5.92 1.52 7 2.41 7H4V12C4 12.55 4.45 13 5 13ZM1 15H13C13.55 15 14 15.45 14 16C14 16.55 13.55 17 13 17H1C0.45 17 0 16.55 0 16C0 15.45 0.45 15 1 15Z"
            fill="#003B81"
          />
        </svg>

        <p className="hidden text-base text-primary-500 font-semibold lg:block">
          visualisasi revenue
        </p>
      </button>

      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-60 z-50 transition-opacity justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      >
        <div
          className="shadow-2xl  p-6 rounded-xl bg-white "
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pl-4  font-gilroy">
            <button
              className="float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setDropdownOpen(false)}
            >
              <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                X
              </span>
            </button>
            <p className="font-bold text-primary-900 text-xl">
              Hitung Pendapatan
            </p>
            <p className="text-sm font-medium text-neutral-300  pt-1.5 pb-2 ">
              Unggah CSV untuk visualisasi data
            </p>
          </div>

          <ul>
            <div class="p-4">
              <div class=" flex justify-center  p-4 transition border-2 border-gray-300  rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <div class="flex flex-col items-center ">
                  <svg
                    width="88"
                    height="88"
                    viewBox="0 0 88 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-6"
                  >
                    <path
                      d="M53.3888 9.88875C52.0113 8.51125 50.1625 7.75 48.2413 7.75H22.25C18.2625 7.75 15 11.0125 15 15V73C15 76.9875 18.2262 80.25 22.2137 80.25H65.75C69.7375 80.25 73 76.9875 73 73V32.5087C73 30.5875 72.2387 28.7388 70.8612 27.3975L53.3888 9.88875ZM54.875 58.5H47.625V65.75C47.625 67.7438 45.9938 69.375 44 69.375C42.0062 69.375 40.375 67.7438 40.375 65.75V58.5H33.125C31.1312 58.5 29.5 56.8688 29.5 54.875C29.5 52.8812 31.1312 51.25 33.125 51.25H40.375V44C40.375 42.0062 42.0062 40.375 44 40.375C45.9938 40.375 47.625 42.0062 47.625 44V51.25H54.875C56.8688 51.25 58.5 52.8812 58.5 54.875C58.5 56.8688 56.8688 58.5 54.875 58.5ZM47.625 29.5V13.1875L67.5625 33.125H51.25C49.2562 33.125 47.625 31.4938 47.625 29.5Z"
                      fill="#D2DCEB"
                    />
                  </svg>

                  <p class="font-medium text-gray-600 items-center ">
                    Jatuhkan file ke sini atau unggah file&nbsp;
                    <span class="text-blue-600 underline">browse</span>
                  </p>
                </div>
                <input type="file" name="file_upload" class="hidden"></input>
              </div>
            </div>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default Upload_csv;
