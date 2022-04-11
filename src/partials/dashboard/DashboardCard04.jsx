import React,{useState,useEffect} from 'react';
import BarChart from '../../charts/BarChart01';


// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04({labelDates}) {
 console.log(labelDates);
  const chartData = {
    labels: ['12-01-2020'],
    // [
    //   '12-01-2020', '01-01-2021', '02-01-2021',
    //   '03-01-2021', '04-01-2021', '05-01-2021',
    // ],
    datasets: [
      // Light blue bars
      {
        label: 'Likes',
        data: [
          800, 
        ],
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Dislikes',
        data: [
          408,
        ],
        backgroundColor: tailwindConfig().theme.colors.green[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Likes VS Dislikes</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
