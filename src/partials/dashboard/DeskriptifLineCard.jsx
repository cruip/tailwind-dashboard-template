import React from 'react';
import LineChart from '../../charts/LineChartDeskriptif';



// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DeskriptifLineCard() {

  const chartData = {
    labels: [
      
      '01-01-2022', '01-02-2022', '01-03-2022',
      '01-04-2022', '01-05-2022',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Inap',
        data: [
          40, 60, 50, 80, 100
        ],
        
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        tension: 0,
        
      },
      // Gray line
      {
        label: 'Jalan',
        data: [
          90, 40, 10, 70, 80
        ],
        borderColor: tailwindConfig().theme.colors.yellow[300],
        borderWidth: 2,
        tension: 0,
        
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-xl border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl text-primary-900">Pasien Rawat Inap vs Pasien Rawat Jalan</h2>
        </header>
        
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DeskriptifLineCard;
