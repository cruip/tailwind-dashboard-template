import React from 'react';
import LineChart from '../../charts/LineChartPrediktifAll';



// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function PrediktifLineAllCard() {

  const chartData = {
    labels: [
      
      '01-01-2022', '01-02-2022', '01-03-2022',
      '01-04-2022', '01-05-2022','01-06-2022',
      '01-07-2022','01-08-2022','01-09-2022',
      '01-10-2022',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Aktual',
        data: [
          4000000, 6000000, 5000000, 8000000, 10000000
        ],
        
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        tension: 0,
        
      },
      // Gray line
      {
        label: 'Prediksi',
        data: [
          null, null, null, null,  10000000, 12000000, 14000000, 13500000, 12000000
        ],
        borderColor: tailwindConfig().theme.colors.red[500],
        borderWidth: 2,
        tension: 0,
        borderDash: [5, 5],
        
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-xl border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl text-primary-900">Prediktif Seluruh Pendapatan</h2>
        </header>
        <p className="text-neutral-400 ">estimasi pendapatan dalam empat bulan kedepan</p>
        
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={365} />
      </div>
    </div>
  );
}

export default PrediktifLineAllCard;
