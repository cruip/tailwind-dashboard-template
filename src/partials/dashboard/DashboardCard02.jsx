import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DashboardCard02() {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '06-01-2021', '07-01-2021', '08-01-2021',
      '09-01-2021', '10-01-2021', '11-01-2021',
      '12-01-2021', '01-01-2022', '02-01-2022',
      '03-01-2022', '04-01-2022', '05-01-2022',
      '06-01-2022', '07-01-2022', '08-01-2022',
      '09-01-2022', '10-01-2022', '11-01-2022',
      '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [
          622, 622, 426, 471, 365, 365, 238,
          324, 288, 206, 324, 324, 500, 409,
          409, 273, 232, 273, 500, 570, 767,
          808, 685, 767, 685, 685,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
      // Gray line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349,
          349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349,
          252, 423, 622, 470, 532,
        ],
        borderColor: tailwindConfig().theme.colors.slate[300],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <div className="">
            <div className=" flex items-center justify-center z-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-indigo-400 to-violet-900 shadow-md">
                <FontAwesomeIcon icon="fa-brands fa-twitter z-0" className="text-white"/>
              </div>
            </div>

          </div>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Twitter</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Followers</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">7,400</div>
          {/*<div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">-14%</div>*/}
        </div>
      </div>
      {/*/!* Chart built with Chart.js 3 *!/*/}
      {/*<div className="grow">*/}
      {/*  /!* Change the height attribute to adjust the chart height *!/*/}
      {/*  <LineChart data={chartData} width={389} height={128} />*/}
      {/*</div>*/}
    </div>
  );
}

export default DashboardCard02;
