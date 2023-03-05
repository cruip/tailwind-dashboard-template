import React, { useState } from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import Help from "./header/Help";
import UserMenu from "./header/UserMenu";
import { NavLink, useLocation } from "react-router-dom";

function Header({}) {
  const location = useLocation();
  const { pathname } = location;

  // This is a terrible navigation strategy, todo: rework it

  const routes = [
    "/",
    "/podcasts",
    "/news",
    "/query-123120/",
    "/query-123120",
    "/query-123120/news",
    "/query-123120/news/",
    "/query-123120/podcasts/",
    "/query-123120/podcasts",
    "/media-100z2c9kds9/",
    "/media-100z2c9kds9",
    "/media-123120",
    "/media-123120/",
  ];
  const queryRoutes = [
    "/query-123120/",
    "/query-123120",
    "/query-123120/news",
    "/query-123120/news/",
    "/query-123120/podcasts",
    "/query-123120/podcasts/",
    "/media-123120",
    "/media-123120/",
    "/advocacy",
  ];

  const mediaRoutes = [
    "/media-123120",
    "/media-123120/",
    "/media-100z2c9kds9/",
    "/media-100z2c9kds9",
    "/media-100z2c9kds9/news",
    "/media-100z2c9kds9/news/",
    "/media-100z2c9kds9/podcasts",
    "/media-100z2c9kds9/podcasts/",
    "/advocacy",
  ];

  const dashboardRoutes = [
    "media-123120",
    "media-123120/",
    "media-100z2c9kds9",
    "media-100z2c9kds9/",
    "media-100z2c9kds9/news",
    "media-100z2c9kds9/news/",
    "media-100z2c9kds9/podcasts",
    "media-100z2c9kds9/podcasts/",
    "query-123120/",
    "query-123120",
    "query-123120/news",
    "query-123120/news/",
    "query-123120/podcasts",
    "query-123120/podcasts/",
    "/advocacy",
  ];

  const standardRoutes = ["/", "/podcasts", "/podcasts/", "/news/", "/news"];
  const hideNavigation = routes.includes(pathname) ? "hidden" : null;
  const hideMedia = mediaRoutes.includes(pathname) ? "hidden" : null;
  const hideQuery = queryRoutes.includes(pathname) ? "hidden" : null;
  const hideStandard = standardRoutes.includes(pathname) ? "hidden" : null;
  const hideDashboard = dashboardRoutes.includes(pathname) ? "hidden" : null;

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex items-center">
            <NavLink
              to="/"
              className={`${
                pathname === "/" ? "text-blue-700" : null
              }  ${hideQuery} ${hideMedia}  ml-4 text-slate-500 hover:text-slate-600`}
            >
              <div>Dashboard</div>
            </NavLink>
            {/*Media specific pages*/}
            <NavLink
              to="/media-100z2c9kds9"
              className={` ${
                pathname === "/media-100z2c9kds9" ? "text-blue-700" : null
              } {\` 
            ${hideQuery} ${hideStandard} ${
                pathname === "/media-123120" ? "hidden" : null
              } ml-4 text-slate-500 hover:text-slate-600`}
            >
              <div>Media</div>
            </NavLink>

            <NavLink
              to="/media-100z2c9kds9/news"
              className={`${
                pathname === "/news" || pathname === "/media-100z2c9kds9/news"
                  ? "text-blue-700"
                  : null
              } ${hideStandard} ${hideQuery} ml-4 text-slate-500 hover:text-slate-600`}
            >
              <div>News</div>
            </NavLink>

            <NavLink
              to="/media-100z2c9kds9/podcasts"
              className={`text-slate-500 ${hideQuery} ${hideStandard} ml-4  hover:text-blue-500`}
            >
              <div>Podcasts</div>
            </NavLink>

            <NavLink
              to="/podcasts"
              className={`${
                pathname === "/podcasts" ? "text-blue-700" : null
              } ${hideMedia} ${hideQuery} ml-4 text-slate-500 hover:text-slate-600`}
            >
              <div>Podcasts</div>
            </NavLink>

            <NavLink
              to="/news"
              className={`${
                pathname === "/news" || pathname === "/news/"
                  ? "text-blue-700"
                  : null
              } ${hideMedia} ${hideQuery} ml-4 text-slate-500 hover:text-slate-600`}
            >
              <div>News</div>
            </NavLink>

            {/*Query specific pages*/}

            <NavLink
              to="/query-123120/news"
              className={`${
                pathname === "/news" || pathname === "/query-123120/news"
                  ? "text-blue-700"
                  : null
              } ${
                pathname === "/query-123120/news" ||
                pathname === "/query-123120/" ||
                pathname === "/query-123120" ||
                pathname === "/query-123120/podcasts"
                  ? null
                  : "hidden"
              } ml-4 text-slate-500 hover:text-slate-600`}
            >
              <div>News</div>
            </NavLink>

            <NavLink
              to="/query-123120/podcasts"
              className={`text-slate-500 ${
                pathname === "/podcasts" ||
                pathname === "/query-123120/podcasts"
                  ? "text-blue-700"
                  : null
              } ${
                pathname === "/query-123120/" ||
                pathname === "/query-123120" ||
                pathname === "/query-123120/news" ||
                pathname === "/query-123120/podcasts"
                  ? null
                  : "hidden"
              } ml-4  hover:text-blue-500`}
            >
              <div>Podcasts</div>
            </NavLink>

            <NavLink
              to="/query-123120"
              className={`${
                pathname === "/query-123120/" ||
                pathname === "/query-123120" ||
                pathname === "/query-123120/news" ||
                pathname === "/query-123120/podcasts"
                  ? null
                  : "hidden"
              }  ${
                pathname === "/query-123120" ? "text-blue-700" : null
              } ml-4 text-slate-500 hover:text-blue-500`}
            >
              <div>Memoir</div>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
