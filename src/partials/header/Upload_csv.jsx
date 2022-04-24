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
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="mr-2"
        >
          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
        </svg>
        <p className="hidden text-base text-primary-500 font-semibold lg:block">visualisasi revenue</p>
        {/* <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>  ##untuk membuat tanda ada yang baru dengan aksen warna merah */}
      </button>

      <Transition
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
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
            className="shadow-2xl border p-6 rounded-xl bg-white "
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
              <p className="font-bold text-xl">Hitung Pendapatan</p>
              <p className="text-base font-medium text-slate-400  pt-1.5 pb-2 ">
                Unggah CSV untuk visualisasi data
              </p>
            </div>

            <ul>
              <div class="relative w-auto my-6 mx-auto max-w-3xl p-8">
                <label class="z-50 flex justify-center w-full h-32 px-4 transition bg-transparent border-2 border-gray-300  rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span class="flex items-center space-x-2">
                    <span class="font-medium text-gray-600 items-center">
                      Jatuhkan file ke sini atau unggah file&nbsp;
                      <span class="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                  <input type="file" name="file_upload" class="hidden"></input>
                </label>
              </div>
            </ul>
          </div>
      </Transition>
    </div>
  );
}

export default Upload_csv;
