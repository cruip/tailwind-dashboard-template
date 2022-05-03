import React from 'react';
import Barchart from '../../components/charts/BarAging';

// Import utilities
import { tailwindConfig } from '../../components/utils/Utils';

function CardAging() {

  const chartData = {
    labels: [
      '01-01-2021', '02-01-2021', '03-01-2021',
      '04-01-2021', '05-01-2021', '06-01-2021',
      '07-01-2021',
    ],
    datasets: [
      // Light yellow bars
      {
        label: 'Claim (T4)',
        data: [
          3, 1, 8, 4, 8, 11, 12,
        ],
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // yellow bars
      {
        label: 'Pembayaran (T5)',
        data: [
          5, 7, 7, 9, 6, 10, 7,
        ],
        backgroundColor: tailwindConfig().theme.colors.yellow[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[200],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="col-span-full  xl:col-span-8 bg-white shadow-lg rounded-xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
      <h2 className="font-bold text-xl text-primary-900">Aging</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <div className='grow'>
      <Barchart data={chartData} width={595} height={350} />
      </div>
    </div>
  );
}

export default CardAging;
