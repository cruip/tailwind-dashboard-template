import React from "react";

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

export const ComparablesCard = ({ title, link, blurb, type, image, pages, author}) => {
  library.add(fab);

  return (
    <a href={link} target="_blank" className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200" >
    <div >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <div className="">
            <div className=" flex items-center justify-between z-10 mt-6 mb-4">
              <div className={`flex items-center justify-center w-20 h-20 rounded-lg  ${image ? "" : "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-indigo-200 to-violet-700 opacity-50 shadow-md"}`}>
              <img src={image} alt="accelerators" className={`${image ? "rounded w-20" : "hidden"}`} />
              </div>
            </div>
          </div>
          <a href={link} target="_blank">
            <FontAwesomeIcon icon={faSquareArrowUpRight} />
          </a>

        </header>
        <h2 className="text-2xl font-semibold text-slate-800 mt-4">{title}</h2>
        <p className="text-xs text-slate-600 mb-2"> <b>Author:</b> {author} • <b>Pages:</b> {pages}</p>
        <hr className="mb-4" />
       <div className={`${type !== "media" ? `hidden` : ''}`}>
        <div className="flex items-start">

          {/*<div className="text-3xl font-bold text-slate-800 mr-2">info</div>*/}
        </div>
       </div>
        <div className="self-center">
          <p className="text-sm text-slate-600 mb-5">{blurb}</p>
        </div>
      </div>
    </div>
    </a>
  );
};

export default ComparablesCard;
