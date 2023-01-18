import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
    <div>
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
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
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
            <span className="sr-only">Close sidebar</span>
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
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
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
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-400 ${
                                  (pathname === "/" ||
                                    pathname.includes("dashboard")) &&
                                  "!text-indigo-500"
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  (pathname === "/" ||
                                    pathname.includes("dashboard")) &&
                                  "text-indigo-600"
                                }`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  (pathname === "/" ||
                                    pathname.includes("dashboard")) &&
                                  "text-indigo-200"
                                }`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Main
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Fintech
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* E-Commerce */}
              <SidebarLinkGroup
                activecondition={pathname.includes("ecommerce")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("ecommerce") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("ecommerce") &&
                                  "text-indigo-300"
                                }`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-slate-700 ${
                                  pathname.includes("ecommerce") &&
                                  "!text-indigo-600"
                                }`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("ecommerce") &&
                                  "text-indigo-500"
                                }`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Writing
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Full Profile
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Partial (w/out TikTok)
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Campaigns */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("campaigns") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("campaigns") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("campaigns") && "text-indigo-500"
                        }`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("campaigns") && "text-indigo-300"
                        }`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Campaigns
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("settings") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-500"
                                }`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-300"
                                }`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-500"
                                }`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-300"
                                }`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Account
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Notifications
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Connected Apps
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Plans
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Billing & Invoices
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Give Feedback
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Utility */}
              <SidebarLinkGroup activecondition={pathname.includes("utility")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("utility") && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-300"
                                }`}
                                cx="18.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-500"
                                }`}
                                cx="5.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-500"
                                }`}
                                cx="18.5"
                                cy="18.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-300"
                                }`}
                                cx="5.5"
                                cy="18.5"
                                r="4.5"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Utility
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Changelog
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Roadmap
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                FAQs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Empty State
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                404
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Knowledge Base
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3">
              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          open && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className="fill-current text-slate-600"
                                d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                              />
                              <path
                                className="fill-current text-slate-400"
                                d="M15 12L8 6v5H0v2h8v5z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Authentication
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign in
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign up
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Reset Password
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Onboarding */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          open && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className="fill-current text-slate-600"
                                d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z"
                              />
                              <path
                                className="fill-current text-slate-400"
                                d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Onboarding
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 1
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 2
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 3
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 4
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Components */}
              <SidebarLinkGroup
                activecondition={pathname.includes("component")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("component") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("component") &&
                                  "text-indigo-500"
                                }`}
                                cx="16"
                                cy="8"
                                r="8"
                              />
                              <circle
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("component") &&
                                  "text-indigo-300"
                                }`}
                                cx="8"
                                cy="16"
                                r="8"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Components
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Button
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Input Form
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Dropdown
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Alert & Banner
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Modal
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Pagination
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tabs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Breadcrumb
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Badge
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Avatar
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tooltip
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Accordion
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Icons
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
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
