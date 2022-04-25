import React from 'react';
import BarChart from '../../charts/BarChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


function DashboardCard09() {




  const chartData = {
    labels: [
      '01-01-2021', '02-01-2021', '03-01-2021',
      '04-01-2021', '05-01-2021', '06-01-2021',
      '07-01-2021',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Closed (T2)',
        data: [
          7, 12, 5, 8, 5, 8, 3,
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Invoices (T3)',
        data: [
          3, 2, 7, 3, 2, 10, 7
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Claim (T4)',
        data: [
          8, 2, 6, 7, 1, 4, 6
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="col-span-full  xl:col-span-8 bg-white shadow-lg rounded-xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-bold text-xl text-primary-600">Performance (KPI)</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595}  height={350} />
      </div>
    </div>
  );
}

export default DashboardCard09;
