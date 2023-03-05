import React from "react";

// Import utilities
import { tailwindConfig, hexToRGB, iconStyling } from "../../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import colors from "tailwindcss/colors";
import {
  faBookOpen,
  faBullhorn,
  faCoffee,
  faHandHoldingDollar,
  faRibbon,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";

export const ComparablesCard = ({ title, link, blurb, type, icon }) => {
  library.add(fab);

  const icons = {
    awareness: faBullhorn,
    funding: faHandHoldingDollar,
    outcomes: faRibbon,
  };

  return (
    <a
      href={link}
      target="_blank"
      className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200"
    >
      <div>
        <div className="px-5 pt-5">
          <header className="flex justify-between items-start mb-2">
            {/* Icon */}
            <div className="">
              <div className=" flex items-center justify-between z-10 mt-6 mb-4">
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-lg bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-orange-200 to-orange-500 opacity-75 shadow-md
                  `}
                >
                  <FontAwesomeIcon
                    className="text-white w-6 h-6"
                    icon={icons[icon]}
                  />
                </div>
              </div>
            </div>
            <a href={link} target="_blank" className="text-orange-500">
              <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </a>
          </header>
          <h2 className="text-2xl font-semibold text-slate-800 mt-4">
            {title}
          </h2>
          <hr className="mb-4" />
          <div className={`${type !== "media" ? `hidden` : ""}`}>
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
