import React, { useRef, useEffect } from 'react';

import {
  Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function BarChart03({
  data,
  width,
  height
}) {

  const canvas = useRef(null);

  useEffect(() => {

    // Calculate sum of values
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const values = data.datasets.map(x => x.data.reduce(reducer));
    const max = values.reduce(reducer);

    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        layout: {
          padding: {
            top: 12,
            bottom: 12,
            left: 20,
            right: 20,
          },
        },
        scales: {
          x: {
            stacked: true,
            display: false,
            max: max,
          },
          y: {
            stacked: true,
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => context.parsed.x,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        },
        animation: {
          duration: 200,
        },
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  );
}

export default BarChart03;