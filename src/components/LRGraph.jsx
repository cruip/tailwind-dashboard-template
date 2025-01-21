import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useCustomContext } from '../context'; // Import the context hook

ChartJS.register(...registerables, annotationPlugin);

function LRGraph() {
  const { getters } = useCustomContext(); // Access the context
  const { section } = getters; // Get the selected section
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false); // Ensure the loading state is reset
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!section) {
        setGraphData(null); // Clear graph data if no section is selected
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset error state

      try {
        console.log(`Fetching data for section: ${section}`);
        
        // Trigger backend script processing
        const response = await fetch(`http://localhost:5000/run-script?section_id=${section}`);
        if (!response.ok) {
          throw new Error(`Failed to trigger backend script for section: ${section}`);
        }

        // Fetch the processed data
        const graphDataResponse = await fetch('/backend/graph_data.json');
        if (!graphDataResponse.ok) {
          throw new Error('Failed to fetch processed graph data');
        }

        const data = await graphDataResponse.json();
        setGraphData(data); // Update graph data
      } catch (err) {
        console.error('Error fetching graph data:', err);
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [section]); // Refetch data when section changes

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading graph for section {section}...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!graphData) {
    return <div>No graph data available. Select a section to view the graph.</div>;
  }

  // Chart data
  const chartData = {
    labels: graphData.belt_rotation,
    datasets: [
      {
        label: 'Predicted Area Sum',
        data: graphData.predicted_area_sum,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Chart options with annotations
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Belt Rotation',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Area Sum',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            scaleID: 'y',
            value: graphData.threshold, // Horizontal threshold line
            borderColor: 'rgb(255, 99, 132)', // Red line
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: `Threshold (${graphData.threshold})`,
              enabled: true,
              position: 'end',
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              color: '#fff',
            },
          },
          beltRotationLine: {
            type: 'line',
            scaleID: 'x',
            value: graphData.exceed_threshold_belt_rotation, // Vertical line at belt rotation
            borderColor: 'rgb(54, 162, 235)', // Blue line
            borderWidth: 2,
            borderDash: [4, 4],
            label: {
              content: `Belt Rotation (${graphData.exceed_threshold_belt_rotation})`,
              enabled: true,
              position: 'end',
              backgroundColor: 'rgba(54, 162, 235, 0.8)',
              color: '#fff',
            },
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Linear Regression Graph for Section {graphData.section_id}
      </h2>
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default LRGraph;
