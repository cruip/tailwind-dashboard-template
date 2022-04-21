import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {

  const chartData = {
    labels: ['Umum', 'Asuransi', 'Kemenkes', 'BPJS'],
    datasets: [
      {
        label: 'Patient Type',
        data: [
          25, 40, 20, 15,
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.yellow[500],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.yellow[400],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.blue[700],
          tailwindConfig().theme.colors.yellow[500],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Patient Type</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
