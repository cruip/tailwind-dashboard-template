import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';

function Notifications() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex ml-3">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${dropdownOpen && 'bg-slate-200'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-current text-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
          <path className="fill-current text-slate-400" d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z" />
        </svg>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 min-w-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Notifications</div>
          <ul>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">📣 <span className="font-medium text-slate-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-medium text-slate-400">Feb 12, 2021</span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">📣 <span className="font-medium text-slate-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-medium text-slate-400">Feb 9, 2021</span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">🚀<span className="font-medium text-slate-800">Say goodbye to paper receipts!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-medium text-slate-400">Jan 24, 2020</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default Notifications;