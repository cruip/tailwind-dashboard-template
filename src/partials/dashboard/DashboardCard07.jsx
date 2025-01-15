import React from 'react';

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Belt Overview</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Belt</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Repairs</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Cost</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Avg. Downtime/Repair (hours)</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Proportion of total repairs</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-red-500 dark:text-red-500">South Crusher Belt</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">6</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">$44,236</div>
                </td>
                <td className="p-2">
                  <div className="text-center">8</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{(6/15*100).toFixed(1)}%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-orange-500 dark:text-orange-500">North Deposit Belt</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">5</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">$30,877</div>
                </td>
                <td className="p-2">
                  <div className="text-center">7</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">33.3%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-gray-800 dark:text-gray-100">North Transport Belt</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">$12,400</div>
                </td>
                <td className="p-2">
                  <div className="text-center">4</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{(2/15*100).toFixed(1)}%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-gray-800 dark:text-gray-100">West Transport Belt</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">1</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">$6,444</div>
                </td>
                <td className="p-2">
                  <div className="text-center">5</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{(1/15*100).toFixed(1)}%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-gray-800 dark:text-gray-100">South West Transport Belt</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">0</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">$404</div>
                </td>
                <td className="p-2">
                  <div className="text-center">0</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">0%</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
