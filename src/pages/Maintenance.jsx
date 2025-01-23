import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';


function TeamsStyleCalendar() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', day: 'Monday', startHour: 10, endHour: 11 },
    { id: 2, title: 'Project Review', day: 'Wednesday', startHour: 14, endHour: 15 },
    { id: 3, title: 'Client Call', day: 'Friday', startHour: 9, endHour: 10 },
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 24 }, (_, i) => i); // Generate 24 hours

  // Handle adding an event (basic example)
  const handleAddEvent = (day, hour) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: Date.now(), title, day, startHour: hour, endHour: hour + 1 },
      ]);
    }
  };

  return (

    <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <Sidebar/>
      <h1 className="text-2xl font-bold mb-6">Maintenance Schedule</h1>

      {/* Calendar Grid */}
      <div className="grid grid-cols-6 border border-gray-300 rounded-lg">
        {/* Header Row */}
        <div className="p-2 font-bold text-center bg-gray-200 dark:bg-gray-700 border-b border-gray-300">
          Time
        </div>
        {days.map((day) => (
          <div
            key={day}
            className="p-2 font-bold text-center bg-gray-200 dark:bg-gray-700 border-b border-l border-gray-300"
          >
            {day}
          </div>
        ))}

        {/* Time Slots */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Hour Label */}
            <div className="p-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300">
              {hour}:00
            </div>

            {/* Hourly Slots for Each Day */}
            {days.map((day) => (
              <div
                key={`${day}-${hour}`}
                className="relative p-2 border-t border-l border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleAddEvent(day, hour)}
              >
                {/* Display Events */}
                {events
                  .filter((event) => event.day === day && event.startHour === hour)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="absolute top-0 left-0 right-0 bg-blue-500 text-white rounded-md p-1 text-xs shadow-md"
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default TeamsStyleCalendar;
