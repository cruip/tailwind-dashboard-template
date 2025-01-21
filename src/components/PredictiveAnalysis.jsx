import React, { useEffect, useState } from 'react';
import { useCustomContext } from '../context';

function PredictiveAnalysis() {
  const { getters } = useCustomContext();
  const { section } = getters; // Get the selected section
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!section) {
        setAnalysisData(null); // Clear data if no section is selected
        setError(null);
        return;
      }

      setLoading(true); // Start loading
      setError(null); // Reset error

      try {
        console.log(`Fetching predictive analysis for section: ${section}`);

        // Trigger backend script processing
        const response = await fetch(`http://localhost:5000/run-script?section_id=${section}`);
        if (!response.ok) {
          throw new Error(`Failed to trigger backend script for section: ${section}`);
        }

        // Fetch the processed data
        const analysisResponse = await fetch('/backend/graph_data.json');
        if (!analysisResponse.ok) {
          throw new Error('Failed to fetch processed analysis data');
        }

        const data = await analysisResponse.json();
        setAnalysisData(data); // Set the fetched data
      } catch (err) {
        console.error('Error fetching predictive analysis:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [section]); // Refetch data whenever the section changes

  if (loading) return <div>Loading predictive analysis...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!analysisData) return <div>No analysis data available. Please select a section to view analysis.</div>;

  // Safely extract variables from analysisData
  const mean_squared_error = analysisData.mean_squared_error || 'N/A';
  const r2_score = analysisData.r2_score || 'N/A';
  const threshold = analysisData.threshold || 'N/A';
  const exceed_threshold_belt_rotation = analysisData.exceed_threshold_belt_rotation;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <ul className="text-gray-700 dark:text-gray-300 space-y-2">
        <li><strong>Mean Squared Error:</strong> {mean_squared_error}</li>
        <li><strong>R-Squared Score:</strong> {r2_score}</li>
        <li><strong>Threshold:</strong> {threshold}</li>
      </ul>
      {exceed_threshold_belt_rotation !== null && exceed_threshold_belt_rotation !== undefined ? (
        <p className="mt-4">
          This section is due for maintenance in approximately{' '}
          <strong className="text-red-600 dark:text-red-400">{Math.round(exceed_threshold_belt_rotation)} belt rotations</strong>.
        </p>
      ) : (
        <p className="text-green-600 dark:text-green-400 mt-4">
          No maintenance required. Predicted area sum does not exceed the threshold.
        </p>
      )}
    </div>
  );
}

export default PredictiveAnalysis;
