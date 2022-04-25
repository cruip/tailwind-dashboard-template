import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/logo-rsui-1.png";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="font-gilroy font-semibold text-base text-neutral-300 ">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only"></span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img
              src={Logo}
              className="hidden sm:block"
              width="full"
              height="52"
              viewBox="0 0 32 32"
            />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500  pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-md mb-0.5 last:mb-0   ${
                  pathname === "/" && "bg-slate-100"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block  hover:text-primary-500 truncate  transition duration-150 ${
                    pathname === "/" && "hover:text-slate-200 text-primary-600"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname === "/" && "!text-indigo-500"
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname === "/" && "text-indigo-600"
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname === "/" && "text-indigo-200"
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span className="ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Deskriptif */}
              <li
                className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
                  pathname.includes("deskriptif") && "bg-slate-100"
                }`}
              >
                <NavLink
                  end
                  to="/deskriptif"
                  className={`block  hover:text-primary-500 truncate transition duration-150 ${
                    pathname.includes("deskriptif") && "hover:text-slate-200 text-primary-600"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        className={`fill-current text-slate-300 ${
                          pathname.includes("deskriptif") && "text-indigo-300"
                        }`}
                        d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("deskriptif") && "text-indigo-300"
                        }`}
                        d="M14 3v5h5M16 13H8M16 17H8M10 9H8"
                      />
                    </svg>
                    <span className="   ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Deskriptif
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Prediktif */}
              <li
                className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
                  pathname.includes("prediktif") && "bg-slate-100"
                }`}
              >
                <NavLink
                  end
                  to="/prediktif"
                  className={`block  hover:text-primary-500 truncate transition duration-150 ${
                    pathname.includes("prediktif") && "hover:text-slate-200 text-primary-600"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("prediktif") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("prediktif") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="   ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Prediktif
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Preskriptif */}
              <li
                className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
                  pathname.includes("preskriptif") && "bg-slate-100"
                }`}
              >
                <NavLink
                  end
                  to="/preskriptif"
                  className={`block  hover:text-primary-500 truncate transition duration-150 ${
                    pathname.includes("preskriptif") && "hover:text-slate-200 text-primary-600"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("preskriptif") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("preskriptif") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="   ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Preskriptif
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Diagnosis */}
              <li
                className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
                  pathname.includes("diagnosis") && "bg-slate-100"
                }`}
              >
                <NavLink
                  end
                  to="/diagnosis"
                  className={`block hover:text-primary-500 truncate transition duration-150 ${
                    pathname.includes("diagnosis") && "hover:text-slate-200 text-primary-600"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("diagnonsis") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("diagnosis") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="   ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Diagnosis
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
