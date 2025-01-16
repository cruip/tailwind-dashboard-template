import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DashboardImages from '../partials/dashboard/DashboardImages';

import { useContext, Context } from '../context.js';

function Dashboard() {
  const { getters, setters } = useContext(Context);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full ml-20">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Overview Dashboard</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                hi
              </div>

            </div>


            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between mb-8">

              {/* Left: Cards */}
              <div className="grid grid-cols-12 gap-6 w-11/12">
                {/* Number of urgent conveyor belt repairs */}
                <DashboardCard03 />

                {/* Weather data */}
                <DashboardCard01 />

                {/* Maintenance History */}
                <DashboardCard02 />

                {/* Direct VS indirect Belt Costs (column graph) */}
                <DashboardCard04 />

                {/* Real time material Flow */}
                <DashboardCard05 />

                {/* Fault distribution in the last 12 months */}
                <DashboardCard06 />

                {/* Belt Overview */}
                <DashboardCard07 />

                {/* Causes of damage */}
                <DashboardCard11 />

                {/* Images */}
                <DashboardImages/>

                {/* Recent Activity */}
                {/* <DashboardCard12 /> */}

                {/* Line Chart (multiple variables) */}
                {/* <DashboardCard08 /> */}

                {/* Floating box chart idk what its called (two variable comparision) */}
                {/* <DashboardCard09 /> */}

                {/* List of single events (no headers) */}
                {/* <DashboardCard13 /> */}
                <div className='mt-[1000px]'>hihih</div>
                <button onClick={event => {
                    event.preventDefault();
                    setters.setBelt('Pilbara express')
                  }}>pilbara express</button>

                  <button onClick={event => {
                    event.preventDefault();
                    setters.setBelt('Just a belt')
                  }}>Just a belt</button>
                </div>

                {/* Right: Actions */}
                {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-start gap-2">
                  <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl items-start p-4 w-[400px]">
                    <span className="self-start text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Predictions</span> 
                  </div>             
                </div> */}
              </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;