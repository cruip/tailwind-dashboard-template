import React, { useState, useEffect } from 'react';
import LineChart from '../../charts/LineChart01';
import { useContext, Context } from '../../context.js';

function DashboardCard03() {

  const [chartData, setChartData] = useState({
    labels: ['T0'],
    datasets: [
      {
        label: 'Conveyor Belts',
        data: [100],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    // Get number of dirty conveyor belts
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Urgent Conveyor Belt Repairs
          </h2>
        </header>
        <div className="text-7xl font-semibold text-gray-400 dark:text-yellow-400 uppercase mb-1 justify-self-center pt-3">
          3
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
