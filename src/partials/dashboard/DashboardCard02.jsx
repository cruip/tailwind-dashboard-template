import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02() {

  const maintenanceData = [
    { date: '12-01-2022', status: 'Completed' },
    { date: '04-01-2023', status: 'Completed' },
    { date: '08-01-2023', status: 'Completed' },
    { date: '12-01-2023', status: 'Completed' },
    { date: '03-01-2024', status: 'Scheduled' },
  ];

  // Find the last completed maintenance
  const lastMaintenance = maintenanceData
    .filter(entry => entry.status === 'Completed')
    .slice(-1)[0];

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl pb-5">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Maintenance History</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Last Maintenance on <span className="text-green-500">Ironflow 01</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="text-1xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {lastMaintenance ? lastMaintenance.date : 'N/A'}
          </div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">
            {lastMaintenance ? lastMaintenance.status : 'No Data'}
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Upcoming Maintenance on <span className="text-red-500">RedEarth Conveyor</span>
        </div>
        <div className="flex items-center">
          <div className="text-1xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {maintenanceData.find(entry => entry.status === 'Scheduled')?.date || 'N/A'}
          </div>
          <div className="text-sm font-medium text-yellow-700 px-1.5 bg-yellow-500/20 rounded-full">
            Scheduled
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
