import React, { useState } from 'react';
import SearchModal from './header/SearchModal';
import Notifications from './header/Notifications';
import Help from './header/Help';
import UserMenu from './header/UserMenu';
import { NavLink, useLocation } from "react-router-dom";

function Header({
}) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          <div className="flex items-center">
            <NavLink to="/" className={`${pathname === "/" ? "text-violet-900" : null}  ${pathname === "/query-123120" || pathname === "/query-123120/news" || pathname === "/query-123120/podcasts" ? "hidden" : null }  ml-4 text-slate-500 hover:text-slate-600`} >
            <div>Dashboard</div>
            </NavLink>

            <NavLink to="/media-100z2c9kds9" className={` ${pathname === "/media-100z2c9kds9" ? "text-violet-900" : null} {\` 
            ${pathname === "/" || pathname === "/podcasts" || pathname === "/news" || pathname === "/query-123120" || pathname === "/query-123120/news" || pathname === "/query-123120/podcasts" ? "hidden" : null} ml-4 text-slate-500 hover:text-slate-600`}>
              <div>Media</div>
            </NavLink>

            <NavLink to="/podcasts" className={`${pathname === "/podcasts" ? "text-violet-900" : null} ${pathname === "/query-123120" || pathname === "/query-123120/news" || pathname === "/query-123120/podcasts" ? "hidden" : null } ml-4 text-slate-500 hover:text-slate-600`}>
              <div>Podcasts</div>
            </NavLink>

            <NavLink to="/news" className={`${pathname === "/news" ? "text-violet-900" : null} ${pathname === "/query-123120" || pathname === "/query-123120/podcasts" || pathname === "/query-123120/news" ? "hidden" : null } ml-4 text-slate-500 hover:text-slate-600`}>
              <div>News</div>
            </NavLink>

            {/*Query specific pages*/}

            <NavLink to="/query-123120/news" className={`${pathname === "/news" ? "text-violet-900" : null} ${pathname === "/query-123120/news" || pathname === "/query-123120" || pathname === "/query-123120/podcasts" ? null : "hidden" } ml-4 text-slate-500 hover:text-slate-600`}>
              <div>News</div>
            </NavLink>

            <NavLink to="/query-123120/podcasts" className={`${pathname === "/podcasts" ? "text-violet-900" : null} ${pathname === "/query-123120" || pathname === "/query-123120/news" || pathname === "/query-123120/podcasts" ? null : "hidden" } ml-4 text-slate-500 hover:text-slate-600`}>
              <div>Podcasts</div>
            </NavLink>

            <NavLink to="/query-123120" className={`${pathname === "/query-123120" || pathname === "/query-123120/news" || pathname === "/query-123120/podcasts" ? "text-violet-900" : "hidden"}  ml-4 text-slate-500 hover:text-slate-600`}>
              <div>Memoir</div>
            </NavLink>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;