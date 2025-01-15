import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const chartData = {
    labels: [
      'Ironflow 01',
      'RedEarth Conveyor',
      'Pilbara Express',
      'OreLink 4000',
      'DustTrail Belt',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Indirect',
        data: [
          800, 1600, 900, 1300, 1950, 1700,
        ],
        backgroundColor: tailwindConfig().theme.colors.gray[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Blue bars
      {
        label: 'Direct',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800,
        ],
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Direct VS Indirect Belt Costs</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
