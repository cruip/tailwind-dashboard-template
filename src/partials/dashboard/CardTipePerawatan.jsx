import React from 'react';
import DoughnutChart from '../../components/charts/DoughnutTipePerawatan';

// Import utilities
import { tailwindConfig } from '../../components/utils/Utils';

function CardTipePerawatan() {

  const chartData = {
    labels: ['Inpation', 'Outpation', 'Emergency'],
    datasets: [
      {
        label: 'Tipe Perawatan',
        data: [
          30, 45, 25
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.yellow[300],
          tailwindConfig().theme.colors.red[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.red[600],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-bold text-xl text-primary-900">Tipe Perawatan</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={200} height={260} />
    </div>
  );
}

export default CardTipePerawatan;
