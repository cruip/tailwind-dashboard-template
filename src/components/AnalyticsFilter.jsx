import React, { useState } from 'react';
import { useCustomContext, Context } from '../context.jsx';

function AnalyticsFilter({ onFilterChange }) {
  const belts = ['Ironflow 01', 'RedEarth Conveyor', 'Pilbara Express', 'OreLink 4000', 'DustTrail Belt'];
  const sections = Array.from({ length: 3 }, (_, i) => i + 1); // Sections 1-10
  const [selectedBelt, setSelectedBelt] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const { getters, setters } = useCustomContext(Context);

  const handleBeltClick = (belt) => {
    setSelectedBelt(belt);
    onFilterChange({ belt, section: selectedSection });
    setters.setBelt(belt);
  };

  const handleSectionChange = async (e) => {
    const section = e.target.value;
    console.log('Selected section:', section);
    setSelectedSection(section);
    onFilterChange({ belt: selectedBelt, section });
    setters.setSection(section);
  
    try {
      const response = await fetch(`http://localhost:5000/run-script?section_id=${section}`);
      if (!response.ok) {
        throw new Error("Failed to process section data.");
      }
  
      const data = await response.json();
      console.log("Script Output:", data.output);
    } catch (error) {
      console.error("Error processing section data:", error.message);
    }
  };

  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      {/* Inputs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Belt Buttons */}
        <div className="flex gap-2">
          {belts.map((belt) => {
            // Assign button colors based on belt name
            const buttonColor =
              belt === 'Ironflow 01'
                ? 'bg-red-600 text-white hover:bg-red-800'
                : belt === 'Pilbara Express'
                ? 'bg-orange-400 text-white hover:bg-orange-600'
                : 'bg-green-400 text-white hover:bg-green-700';

            return (
              <button
                key={belt}
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 ${
                  selectedBelt === belt ? 'border-white' : 'border-transparent'
                } ${buttonColor}`}
                onClick={() => handleBeltClick(belt)}
              >
                {belt}
              </button>
            );
          })}
        </div>

        {/* Section Dropdown */}
        <div>
          <label htmlFor="section" className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
            Section:
          </label>
          <select
            id="section"
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 w-40"
            value={selectedSection}
            onChange={handleSectionChange}
          >
            <option value="">Select</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-0">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">Legend:</h3>
        <ul className="space-y-1">
          <li className="flex items-center">
            <span className="w-4 h-4 bg-green-400 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Low</span>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-orange-400 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Moderate</span>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-red-600 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">High</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AnalyticsFilter;
