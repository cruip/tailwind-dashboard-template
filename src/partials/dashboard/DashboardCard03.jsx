import React, { useState, useEffect } from 'react';
import LineChart from '../../charts/LineChart01';

function DashboardCard03() {
  const [chartData, setChartData] = useState({
    labels: ['T0'],
    datasets: [
      {
        label: 'Material Flow Rate',
        data: [100],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const fakeFlowRates = [100, 150, 200, 180, 220, 250, 300];
    const updateInterval = 2000; // Update every 2 seconds

    let index = 0;

    const updateChartData = () => {
      setChartData((prevData) => {
        const newLabels = [...prevData.labels, `T${index}`];
        const newData = [...prevData.datasets[0].data, fakeFlowRates[index % fakeFlowRates.length]];

        console.log('Updating Chart:', { newLabels, newData }); // Debugging

        return {
          labels: newLabels.slice(-10),
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData.slice(-10),
            },
          ],
        };
      });

      index++;
    };

    const interval = setInterval(updateChartData, updateInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Material Flow Rate
          </h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Live Data
        </div>
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          <LineChart data={chartData} width={389} height={128} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
