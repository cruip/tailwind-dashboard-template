import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = "Sydney"; // Specify the location here
  const apiKey = "848e83f565080d330f49c682c7c52251"; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch weather data.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
        <p className="text-gray-500 dark:text-gray-400">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Weather in {weatherData.name}
          </h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Current Weather
        </div>
        <div className="flex items-center mb-4">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {weatherData.weather[0].description}
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Humidity: {weatherData.main.humidity}%
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Wind Speed: {weatherData.wind.speed} m/s
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
