import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function DashboardCard04() {

  const chartData = {
    labels: ['12月', '1月', '2月', '3月', '4月', '5月'],
    datasets: [
      {
        label: '自然流量',
        data: [4200, 3800, 5100, 4600, 5200, 4900],
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: '付费流量',
        data: [1800, 2200, 1900, 2100, 2400, 2300],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">流量来源分布</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">近6个月自然流量 vs 付费流量</p>
      </header>
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
