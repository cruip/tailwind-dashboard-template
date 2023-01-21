import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../EditMenu";

// Import utilities
import { tailwindConfig, hexToRGB, iconStyling } from "../../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import colors from "tailwindcss/colors";
import {
  faCoffee,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";

export const DashboardCard = ({ title, countType, total, link, blurb, type }) => {
  library.add(fab);
  return (
    <a href={link} target="_blank" className="flex flex-col col-span-full sm:col-span-3 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200">
    <div >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}

          <div className="">
            <div className=" flex items-center justify-between z-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-indigo-400 to-violet-900 shadow-md">
                <FontAwesomeIcon
                  icon={iconStyling[title]}
                  className="text-white"
                />
              </div>
            </div>
          </div>
          <a href={link} target="_blank">
            <FontAwesomeIcon icon={faSquareArrowUpRight} />
          </a>

          {/* Menu button */}
          {/*<EditMenu className="relative inline-flex">*/}
          {/*  <li>*/}
          {/*    <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>*/}
          {/*  </li>*/}
          {/*</EditMenu>*/}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">{title}</h2>
       <div className={`${type === "media" || type === "query" ? `` : 'hidden'}`}>

        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          {countType}
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{total}</div>
          {/*<div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">*/}
          {/*  +1*/}
          {/*</div>*/}
        </div>
       </div>
        <div className="self-center">
          <p className="text-xs text-slate-600 mb-5">{blurb}</p>
        </div>
      </div>
    </div>
    </a>
  );
};

export default DashboardCard;
