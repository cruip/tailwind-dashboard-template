import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar'; // Adjust the path to your Sidebar component
import Header from '../partials/Header'; // Adjust the path to your Header component

function Maintenance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Manage sidebar open state
  const [currentDate, setCurrentDate] = useState(new Date()); // Manage current displayed month/year

  // Example events
  const events = [
    { date: '2025-01-03', title: 'System Upgrade' },
    { date: '2025-01-10', title: 'Ironflow Conveyor Maintenance' },
    { date: '2025-01-15', title: 'Safety Inspection' },
    { date: '2025-01-20', title: 'Monthly Operations Meeting' },
    { date: '2025-01-25', title: 'RedEarth Conveyor Calibration' },
  ];

  // Extract current year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based index

  // Get number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // First day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Generate days for the current month
  const days = [...Array(daysInMonth).keys()].map((day) => {
    const date = new Date(year, month, day + 1);
    const dateString = date.toISOString().split('T')[0];
    const dayEvents = events.filter((event) => event.date === dateString);

    return {
      day: day + 1,
      dateString,
      events: dayEvents,
    };
  });

  // Handlers for navigation between months
  const handlePreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="p-6 flex flex-col grow">
          <h1 className="text-2xl font-bold mb-6">Maintenance Calendar</h1>

          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePreviousMonth}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Previous
            </button>
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleString('default', { month: 'long' })} {year}
            </h2>
            <button
              onClick={handleNextMonth}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 text-center font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 flex-1">
            {/* Empty cells for days before the first day of the month */}
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <div key={index} className="border-b border-r border-gray-300 dark:border-gray-700 h-full"></div>
            ))}

            {/* Render days */}
            {days.map((day) => (
              <div
                key={day.day}
                className={`relative border-b border-r border-gray-300 dark:border-gray-700 flex flex-col justify-start items-start p-2 cursor-pointer ${
                  day.dateString === selectedDate?.dateString
                    ? 'bg-blue-300 dark:bg-blue-700'
                    : day.events.length > 0
                    ? 'bg-gray-200 dark:bg-gray-800'
                    : ''
                } hover:bg-gray-300 dark:hover:bg-gray-700`}
                onClick={() => setSelectedDate(day)}
              >
                {/* Day Number */}
                <span className="absolute top-1 right-1 text-lg font-bold text-gray-800 dark:text-gray-200">
                  {day.day}
                </span>
                {/* Event Titles */}
                {day.events.map((event, index) => (
                  <span key={index} className="text-xs text-red-500 dark:text-red-400 mt-1">
                    {event.title}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="relative mt-6 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow">
              {/* Header with Close Button */}
              <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
                <h2 className="text-lg font-bold">Details for {selectedDate.dateString}</h2>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Event Details */}
              {selectedDate.events.length > 0 ? (
                <ul>
                  {selectedDate.events.map((event, index) => (
                    <li key={index} className="mb-4">
                      <h3 className="text-sm font-bold">{event.title}</h3>
                      <p className="text-sm"><strong>Description:</strong> Routine event description.</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No events scheduled for this day.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Maintenance;
