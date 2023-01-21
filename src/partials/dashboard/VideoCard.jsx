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

export const VideoCard = ({ title, link, blurb, size }) => {
  library.add(fab);

  return (
    <a
      href={link}
      target="_blank"
      className={`flex flex-col col-span-full ${
        size === "small" ? "sm:col-span-3 xl:col-span-3" : null
      } bg-white shadow-lg rounded-sm border border-slate-200`}
    >
      <div>
        <div className="px-5 pt-5">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            {title}
          </h2>
          <hr className="mb-4" />
          <div className="w-full">
            <iframe
              src={link}
              className="w-full h-[550px] rounded-lg"
              allow="encrypted-media;"
            ></iframe>
          </div>
          {/*</div>*/}
          <div className="self-center">
            <p className="text-sm text-slate-600 mb-5">{blurb}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
