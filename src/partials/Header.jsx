import * as React from "react";
import Upload_csv from "./header/Upload_csv";
import Time from "./header/Time";

import UserMenu from "./header/UserMenu";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 bg-primary-500 z-30">
      <div className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <div className="font-gilroy relative ml-4 text-white">
              <h1 className="text-xl font-bold inline-flex">
                Selamat Datang <span className="hidden lg:block"> &nbsp;di Dashboard Revenue RSUI</span>
              </h1>
              <Time  />
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <Upload_csv />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
