import React from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import DoughnutChart from "../../charts/DoughnutChart";
import {
  faMars,
  faSquareArrowUpRight,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Demographics = () => {
  const chartData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      // Blue bars
      {
        data: [4, 23, 28, 26, 18],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  const countriesChartData = {
    labels: ["United States", "Canada", "Australia"],
    datasets: [
      {
        label: "Top Countries",
        data: [91, 4, 2],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-7 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800 text-lg">Demographics</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/3 ">
          <h3 className="px-5 font-semibold mt-5 mb-[-20px]">Age</h3>
          <BarChart data={chartData} width={389} height={128} />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="px-5 font-semibold mt-5 mb-[-20px]">Countries</h3>
          <DoughnutChart data={countriesChartData} width={389} height={260} />
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="px-5 font-semibold mt-5">Gender</h3>
          <div className="flex flex-row flex-col w-1/2 mt-14">
            <div className="text-3xl px-5 py-2 flex flex-row">
              <FontAwesomeIcon
                icon={faVenus}
                className="w-14 h-14 self-center mr-4"
              />
              <div className="flex flex-col">
                <p className="font-bold">93%</p>
                <div className="ml-2 text-center font-semibold text-lg">
                  Female
                </div>
              </div>
            </div>
            <div className="text-3xl px-5 py-2 flex flex-row">
              <FontAwesomeIcon
                icon={faMars}
                className="w-14 h-14 self-center mr-4"
              />
              <div className="flex flex-col">
                <p className="font-bold">7%</p>
                <div className=" text-center font-semibold text-lg">Male</div>
              </div>
            </div>
          </div>
          {/*<DoughnutChart data={countriesChartData} width={389} height={260} />*/}
        </div>
      </div>
    </div>
  );
};

export default Demographics;
