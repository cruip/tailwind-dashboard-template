import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {

  const chartData = {
    labels: [
      'South Crusher Belt',
      'North Deposit Belt',
      'North Transport Belt',
      'West Transport Belt',
      'South West Transport Belt',
    ],
    datasets: [
      {
        label: 'Belt Name',
        data: [
          10,8,4,2,1
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.yellow[900],
          tailwindConfig().theme.colors.gray[700],
          tailwindConfig().theme.colors.yellow[700],
          tailwindConfig().theme.colors.gray[800],
          tailwindConfig().theme.colors.yellow[500],
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.gray[500],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.gray[700],
          tailwindConfig().theme.colors.yellow[100],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Fault Distribution in Last 12 months</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
