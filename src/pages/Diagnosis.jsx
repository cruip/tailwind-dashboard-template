import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";


function Diagnosis() {
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
                  Diagnosis
                </h1>
              </div>
            </div>
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
            

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
 
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
 
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Diagnosis;
