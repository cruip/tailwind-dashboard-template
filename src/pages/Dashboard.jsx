import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import Datepicker from "../partials/actions/Datepicker";

import CardAccruePendapatan from "../partials/dashboard/CardAccruePendapatan";
import CardPenjaminPasien from "../partials/dashboard/CardPenjaminPasien";
import CardTipePerawatan from "../partials/dashboard/CardTipePerawatan";
import CardPiutangvs from "../partials/dashboard/CardPiutangvs";
import CardHutangvs from "../partials/dashboard/CardHutangvs";

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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="">
                <h1 className="font-medium text-neutral-300 hidden md:block">
                  Dashboard Revenue
                </h1>
                <h1 className="font-bold text-primary-600 lg:text-2xl">
                  Dashboard
                </h1>
              </div>
              {/* Kanan: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <Datepicker />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 sm:gap-6 gap-3 ">
              <div className="md:col-span-6 col-span-full">
                <CardAccruePendapatan />
              </div>
              <div className="md:col-span-3 col-span-full">
                <CardPenjaminPasien />
              </div>
              <div className="md:col-span-3 col-span-full">
                <CardTipePerawatan />
              </div>
              <div className="sm:col-span-6 col-span-full">
                <CardPiutangvs />
              </div>
              <div className="sm:col-span-6 col-span-full">
                <CardHutangvs />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
