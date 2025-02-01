import React from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function DashboardCard11() {

  const chartData = {
    labels: ['Reasons'],
    datasets: [
      {
        label: 'Having difficulties using the product',
        data: [131],
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Missing features I need',
        data: [100],
        backgroundColor: getCssVariable('--color-violet-700'),
        hoverBackgroundColor: getCssVariable('--color-violet-800'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Not satisfied about the quality of the product',
        data: [81],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'The product doesn’t look as advertised',
        data: [65],
        backgroundColor: getCssVariable('--color-green-500'),
        hoverBackgroundColor: getCssVariable('--color-green-600'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Other',
        data: [72],
        backgroundColor: getCssVariable('--color-gray-200'),
        hoverBackgroundColor: getCssVariable('--color-gray-300'),
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Reason for Refunds</h2>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">449</div>
          <div className="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full">-22%</div>
        </div>
      </div>      
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;
