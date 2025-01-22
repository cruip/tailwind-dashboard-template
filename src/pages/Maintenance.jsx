import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar'; // Adjust the path based on your project structure

function Maintenance() {
  const [selectedDate, setSelectedDate] = useState(null);

  const maintenanceData = [
    { date: '2024-03-15', task: 'Ironflow 01 Maintenance' },
    { date: '2024-03-20', task: 'RedEarth Conveyor Inspection' },
    { date: '2024-04-01', task: 'Pilbara Express Belt Check' },
    { date: '2024-04-15', task: 'OreLink 4000 Lubrication' },
    { date: '2024-04-20', task: 'DustTrail Belt Fault Resolution' },
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate an array of days
  const days = [...Array(daysInMonth).keys()].map((day) => {
    const date = new Date(year, month, day + 1);
    const dateString = date.toISOString().split('T')[0];
    const maintenance = maintenanceData.find((item) => item.date === dateString);

    return {
      day: day + 1,
      dateString,
      maintenance,
    };
  });

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Maintenance Schedule</h1>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="font-semibold text-gray-700 dark:text-gray-300">{d}</div>
          ))}
          {days.map((day) => (
            <div
              key={day.day}
              className={`p-2 border rounded-lg ${
                day.maintenance ? 'bg-yellow-300 dark:bg-yellow-500 text-gray-900' : 'bg-gray-100 dark:bg-gray-700'
              } hover:bg-yellow-400 dark:hover:bg-yellow-600 cursor-pointer`}
              onClick={() => setSelectedDate(day)}
            >
              {day.day}
              {day.maintenance && (
                <span className="block text-xs text-red-600 dark:text-red-400 mt-1">⚠️</span>
              )}
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="mt-4 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-lg font-bold mb-2">Details for {selectedDate.dateString}</h2>
            {selectedDate.maintenance ? (
              <p>{selectedDate.maintenance.task}</p>
            ) : (
              <p>No maintenance scheduled for this day.</p>
            )}
            <button
              className="mt-2 text-blue-500 dark:text-blue-400 underline"
              onClick={() => setSelectedDate(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
