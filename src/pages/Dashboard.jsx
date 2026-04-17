import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import KPIOverview from '../partials/dashboard/KPIOverview';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
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

            {/* Dashboard Header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">运营概览</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">以下是您平台的最新运营数据</p>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <Datepicker align="right" />
              </div>
            </div>

            {/* KPI Overview Section */}
            <div className="mb-8">
              <KPIOverview />
            </div>

            {/* Trend Charts Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">数据趋势</h2>
              <div className="grid grid-cols-12 gap-6">
                {/* Sales Over Time */}
                <DashboardCard08 />
                {/* Direct vs Indirect Traffic */}
                <DashboardCard04 />
              </div>
            </div>

            {/* Business Details Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">业务详情</h2>
              <div className="grid grid-cols-12 gap-6">
                {/* Top Channels - Takes full width on mobile, 8 cols on xl */}
                <DashboardCard07 />
                {/* Customers - Takes full width on mobile, 6 cols on xl */}
                <DashboardCard10 />
              </div>
            </div>

            {/* Activity & Transactions Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">最近动态</h2>
              <div className="grid grid-cols-12 gap-6">
                {/* Recent Activity */}
                <DashboardCard12 />
                {/* Income/Expenses */}
                <DashboardCard13 />
              </div>
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;
