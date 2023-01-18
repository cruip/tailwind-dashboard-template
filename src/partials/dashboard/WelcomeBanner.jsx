import React from "react";
import Headshot from "../../images/katie-head-shot.png";

function WelcomeBanner() {
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
        <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
              <stop stopColor="#A5B4FC" offset="0%" />
              <stop stopColor="#818CF8" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="50%"
              y1="24.537%"
              x2="50%"
              y2="100%"
              id="welcome-c"
            >
              <stop stopColor="#4338CA" offset="0%" />
              <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="rotate(64 36.592 105.604)">
              <mask id="welcome-d" fill="#fff">
                <use xlinkHref="#welcome-a" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
              <path
                fill="url(#welcome-c)"
                mask="url(#welcome-d)"
                d="M64-24h80v152H64z"
              />
            </g>
            <g transform="rotate(-51 91.324 -105.372)">
              <mask id="welcome-f" fill="#fff">
                <use xlinkHref="#welcome-e" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
              <path
                fill="url(#welcome-c)"
                mask="url(#welcome-f)"
                d="M40.333-15.147h50v95h-50z"
              />
            </g>
            <g transform="rotate(44 61.546 392.623)">
              <mask id="welcome-h" fill="#fff">
                <use xlinkHref="#welcome-g" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
              <path
                fill="url(#welcome-c)"
                mask="url(#welcome-h)"
                d="M40.333-15.147h50v95h-50z"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex flex-row">
        <div className="relative">
          <div className="absolute flex items-center justify-center z-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-#5653D1 to-#5653D1 shadow-md"></div>
          </div>
        </div>

        <div className="mr-5">
          <img
            className="w-20 h-20 rounded-full border border-2 shadow-neutral-800 drop-shadow-md"
            src={Headshot}
            width="50"
            height="50"
            alt="User 01"
          />
        </div>
        <div className="-align-center h-full">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            Katie Coleman
          </h1>
          <p className="text-sm italic">
            Stage IV Cancer Survivor • Software Engineer • Writer • Founder •
            Content Creator
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
