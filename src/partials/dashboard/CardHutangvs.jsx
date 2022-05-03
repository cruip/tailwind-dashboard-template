import React from 'react';
import LineChart from '../../components/charts/LineHutangvs';



// Import utilities
import { tailwindConfig, hexToRGB } from '../../components/utils/Utils';

function CardHutangvs() {

  const chartData = {
    labels: [
      
      '01-01-2022', '01-02-2022', '01-03-2022',
      '01-04-2022', '01-05-2022', '01-06-2022',
      '01-07-2022', '01-08-2022', '01-09-2022',
      '01-10-2022', '01-11-2022', '01-12-2022',
    ],
    datasets: [
      // yellow line
      {
        label: 'Internal',
        data: [
          40, 60, 50, 40, 50, 80, 70, 50, 40, 30,  20,  40,
        ],
        
        borderColor: tailwindConfig().theme.colors.yellow[300],
        backgroundColor: tailwindConfig().theme.colors.yellow[100],
        borderWidth: 2,
        tension: 0,
        
      },
      // blue line
      {
        label: 'Pihak Ketiga',
        data: [
          90, 40, 10, 20, 80, 40, 50, 70, 70, 80, 60, 90,
        ],
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        backgroundColor: tailwindConfig().theme.colors.blue[300],
        tension: 0,
        
      },
      {
        label: 'Pihak Ketiga Lainnya',
        data: [
          40, 10, 30, 40, 30, 70, 50, 20, 50, 50, 40, 20,
        ],
        borderColor: tailwindConfig().theme.colors.red[500],
        backgroundColor: tailwindConfig().theme.colors.red[300],
        borderWidth: 2,
        tension: 0,
        
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-xl border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl text-primary-900">Hutang Internal vs Pihak Ketiga vs Pihak Ketiga Lainnya</h2>
        </header>
        
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={300} />
      </div>
    </div>
  );
}

export default CardHutangvs;
