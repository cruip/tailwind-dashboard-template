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
import Banner from '../partials/Banner';

function Dashboard() {

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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Conveyor Belt Analytics Dashboard</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                Filter button
                <FilterButton align="right" />
                Datepicker built with React Day Picker
                <Datepicker align="right" />
              </div>

            </div>


            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between mb-8">

              {/* Left: Cards */}
              <div className="grid grid-cols-12 gap-6 w-2/3">

                {/* Line chart (Acme Plus) */}
                <DashboardCard01 />
                {/* Line chart (Acme Advanced) */}
                {/* <DashboardCard02 /> */}
                {/* Line chart (Acme Professional)
                {/* <DashboardCard03 /> */}
                {/* Bar chart (Direct vs Indirect) */}
                {/* <DashboardCard04 /> */}
                {/* Line chart (Real Time Value) */}
                {/* <DashboardCard05 /> */}
                {/* Doughnut chart (Top Countries) */}
                {/* <DashboardCard06 /> */}
                {/* Table (Top Channels) */}
                {/* <DashboardCard07 /> */}
                {/* Line chart (Sales Over Time) */}
                {/* <DashboardCard08 /> */}
                {/* Stacked bar chart (Sales VS Refunds) */}
                {/* <DashboardCard09 /> */}
                {/* Card (Customers) */}
                {/* <DashboardCard10 /> */}
                {/* Card (Reasons for Refunds) */}
                {/* <DashboardCard11 /> */}
                {/* Card (Recent Activity) */}
                {/* <DashboardCard12 /> */}
                {/* Card (Income/Expenses) */}
                {/* <DashboardCard13 /> */}

                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-start gap-2 w-1/3">
                  <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl items-start p-4 w-[490px]">
                    <span className="self-start">Predictions</span>
                  </div>             
                </div>
              </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;