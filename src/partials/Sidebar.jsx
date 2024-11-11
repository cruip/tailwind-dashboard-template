import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Menus from "./Menus";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
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
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {Menus.map((menu) => {
                if (menu.type === "submenu") {
                  // Check if any submenu item is active
                  const isActive = menu.subItems.some(item => pathname === item.path);
                  
                  return (
                    <SidebarLinkGroup key={menu.id} activecondition={isActive}>
                      {(handleClick, open) => {
                        return (
                          <>
                            <NavLink
                              href="#0"
                              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                                isActive ? "" : "hover:text-gray-900 dark:hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleClick();
                                setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <menu.icon className={`shrink-0 h-6 w-6 ${
                                    isActive ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                                  }`} />
                                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {menu.title}
                                  </span>
                                </div>
                                <div className="flex shrink-0 ml-2">
                                  <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </NavLink>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                                {menu.subItems.map((item) => (
                                  <li key={item.id} className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to={item.path}
                                      className={({ isActive }) =>
                                        "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        {item.title}
                                      </span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        );
                      }}
                    </SidebarLinkGroup>
                  );
                } else if (menu.type === "direct") {
                  return (
                    <li key={menu.id} className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes(menu.title.toLowerCase()) && "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"}`}>
                      <NavLink
                        end
                        to={menu.path}
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes(menu.title.toLowerCase()) ? "" : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="grow flex items-center">
                            <menu.icon className={`shrink-0 h-6 w-6 ${
                              pathname.includes(menu.title.toLowerCase()) ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                            }`} />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {menu.title}
                            </span>
                          </div>
                          {/* Badge - if you want to add badges like the original */}
                          {menu.badge && (
                            <div className="flex flex-shrink-0 ml-2">
                              <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-violet-400 px-2 rounded">
                                {menu.badge}
                              </span>
                            </div>
                          )}
                        </div>
                      </NavLink>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 
