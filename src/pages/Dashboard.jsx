import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard04 from "../partials/dashboard/DeskriptifBarCardAging";
import DashboardCard06 from "../partials/dashboard/DeskriptifDoughCard";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DeskriptifBarCardKPI";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import SearchModal from '../partials/header/SearchModal';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden font-gilroy">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Judul pagenya */}
            <div className="relative overflow-hidden ">
              {/* Content */}
              <div className="">
                <h1 className="font-medium text-neutral-300 hidden md:block">
                  Dashboard Revenue
                </h1>
                <h1 className="font-bold text-primary-600 lg:text-2xl">
                  Dashboard
                </h1>
                <SearchModal/>
              </div>
            </div>

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                {/* <Datepicker /> */}
                {/* Add view button */}
                {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                </button> */}
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard06 />
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Customers) */}
              {/* <DashboardCard10 /> */}
              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
