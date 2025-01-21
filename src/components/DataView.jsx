import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useCustomContext } from '../context';

function DataView() {
  const { getters } = useCustomContext();
  const { belt } = getters;

  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCsvData = async () => {
      if (!belt) {
        setCsvData([]);
        setError('No belt selected.');
        setLoading(false);
        return;
      }

      const beltToCsvMapping = {
        'Ironflow 01': '/backend/sample_data.csv',
        'RedEarth Conveyor': '/backend/sample_data_1',
        'Pilbara Express': '/backend/sample_data_2.csv',
        'OreLink 4000': '/backend/sample_data_3.csv',
        'DustTrail Belt': '/backend/sample_data_4.csv',
      };

      const csvPath = beltToCsvMapping[belt];
      if (!csvPath) {
        setCsvData([]);
        setError('No CSV file found for the selected belt.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(csvPath);
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file');
        }
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setCsvData(result.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCsvData();
  }, [belt]);

  if (loading) return <div>Loading CSV data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Data View</h2>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p><strong>box_id:</strong> Unique identifier for detected objects.</p>
            <p><strong>section_id:</strong> Section of the belt for data collection.</p>
            <p><strong>belt_rotation:</strong> Belt's rotational position during capture.</p>
            <p><strong>timestamp:</strong> Time and date of detection.</p>
            <p><strong>tag_name:</strong> Detection category (e.g., "carryback").</p>
          </div>
          <div>
            <p><strong>probability:</strong> Confidence score of detection.</p>
            <p><strong>left, top:</strong> Coordinates of the bounding box's top-left corner.</p>
            <p><strong>width, height:</strong> Dimensions of the bounding box in pixels.</p>
            <p><strong>image_path:</strong> File path to the detection image.</p>
            <p><strong>area_sum:</strong> Cumulative detected area for a section.</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-96 border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="table-auto border-collapse w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {Object.keys(csvData[0] || {}).map((header) => (
                <th key={header} className="px-4 py-2 border dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-4 py-2 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataView;
