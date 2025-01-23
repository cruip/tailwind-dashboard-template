import React, { useState } from 'react';
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ReportForm from '../partials/ReportForm';
 
import uploadImage from '../images/upload-svg.svg';
 
function Reports () {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);
   
    // Reports
    const pending1 = {
        date: new Date(),
        belt: "Pilbara Express",
        cost: 44236,
        expectedDowntime: 8,
        reason: "Carryback"
    }
 
    const pending2 = {
        date: new Date(2025, 0, 5), // January 5, 2025
        belt: "DustTrail Belt",
        cost: 32000,
        expectedDowntime: 6,
        reason: "Belt Misalignment"
    };
   
    const pending3 = {
        date: new Date(2025, 0, 3), // January 3, 2025
        belt: "OreLink4000",
        cost: 51000,
        expectedDowntime: 10,
        reason: "Slippage"
    };
 
    // List of pending reports
    const [pendingReports, setPendingReports] = useState([pending1, pending2, pending3]);
 
    const [approvedReports, setApprovedReports] = useState([
        {
            startDate: new Date(2024, 11, 20), // December 20, 2024
            belt: "OreLink4000",
            startTime: new Date(2024, 11, 20, 8, 15), // 8:15 AM
            expectedDowntime: 6,
            status: "In Progress",
        },
        {
            startDate: new Date(2024, 11, 15), // December 15, 2024
            belt: "Pilbara Express",
            startTime: new Date(2024, 11, 15, 14, 45), // 2:45 PM
            expectedDowntime: 8,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 10, 30), // November 30, 2024
            belt: "DustTrail Belt",
            startTime: new Date(2024, 10, 30, 9, 0), // 9:00 AM
            expectedDowntime: 7,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 10, 15), // November 15, 2024
            belt: "RedEarth Conveyor",
            startTime: new Date(2024, 10, 15, 16, 30), // 4:30 PM
            expectedDowntime: 5,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 9, 25), // October 25, 2024
            belt: "IronFlow 01",
            startTime: new Date(2024, 9, 25, 10, 15), // 10:15 AM
            expectedDowntime: 10,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 8, 20), // September 20, 2024
            belt: "OreLink4000",
            startTime: new Date(2024, 8, 20, 13, 0), // 1:00 PM
            expectedDowntime: 9,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 7, 10), // August 10, 2024
            belt: "Pilbara Express",
            startTime: new Date(2024, 7, 10, 11, 45), // 11:45 AM
            expectedDowntime: 6,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 6, 5), // July 5, 2024
            belt: "DustTrail Belt",
            startTime: new Date(2024, 6, 5, 15, 30), // 3:30 PM
            expectedDowntime: 4,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 5, 1), // June 1, 2024
            belt: "RedEarth Conveyor",
            startTime: new Date(2024, 5, 1, 9, 20), // 9:20 AM
            expectedDowntime: 7,
            status: "Complete",
        },
        {
            startDate: new Date(2024, 4, 15), // May 15, 2024
            belt: "IronFlow 01",
            startTime: new Date(2024, 4, 15, 12, 0), // 12:00 PM
            expectedDowntime: 8,
            status: "Complete",
        },
    ]);    
 
    return (
        <div className="flex h-screen overflow-hidden w-full">
          {isFormVisible && (
                <ReportForm
                    toggleForm={setFormVisible}
                    setPendingReports={setPendingReports}
                />
          )}
   
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
   
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
   
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
   
            <main className="grow">
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
   
                {/* Report actions */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8 mx-10">
   
                  <div className="mb-4 sm:mb-0 flex flex-col w-full">
                    <div className='flex flex-row justify-between px-1'>
                        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-5">Reports</h1>
 
                        <button className="hover-cursor self-start ml-2 flex flex-row gap-2 items-center"
                        onClick={() => setFormVisible(true)}>
                            <img src={uploadImage} className="w-3 h-3" alt="Upload Icon" />
                            <span className='font-thin'>New Report</span>
                        </button>
                    </div>
                   
 
 
                    {/* Pending Reports */}
                    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full">
                        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Pending</h2>
                        </header>
                        <div className="p-3">
                            {/* Table */}
                            <div className="overflow-x-auto">
                            <table className="table-auto w-full dark:text-gray-300">
                                {/* Table header */}
                                <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                                <tr>
                                    <th className="p-2">
                                    <div className="font-semibold text-left">Date</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Belt</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Cost</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Expected Downtime (hours)</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Reason</div>
                                    </th>
                                </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60
                                border-b border-gray-100 dark:border-gray-700/60">
                                    {pendingReports.map((report, index) => (
                                        <tr key={index}>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <div className="text-center">{report.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">{report.belt}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-green-500">${report.cost.toLocaleString()}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">{report.expectedDowntime}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-red-500 dark:text-red-500">{report.reason}</div>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                       
                        {/* Approved Reports */}
                        <header className="px-5 pb-3 mt-10 border-b border-gray-100 dark:border-gray-700/60">
                            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Approved</h2>
                        </header>
                        <div className="px-3 pt-2 pb-3">
                            {/* Table */}
                            <div className="overflow-x-auto">
                            <table className="table-auto w-full dark:text-gray-300">
                                {/* Table header */}
                                <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                                <tr>
                                    <th className="p-2">
                                    <div className="font-semibold text-left">Start Date</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Belt</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Start Time</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Expected Downtime (hours)</div>
                                    </th>
                                    <th className="p-2">
                                    <div className="font-semibold text-center">Status</div>
                                    </th>
                                </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                                {approvedReports.map((report, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <div className="text-center">
                                                    {report.startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">{report.belt}</div>
                                        </td>
                                        <td className="p-2">
                                        <div className="text-center">
                                            {report.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">{report.expectedDowntime}</div>
                                        </td>
                                        <td className="p-2">
                                            <div
                                                className={`text-center ${report.status === "Complete" ? "text-green-500" : "text-yellow-500"}`}>
                                                {report.status}
                                            </div>
                                        </td>
 
                                    </tr>
                                ))}
 
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
}
 
export default Reports;