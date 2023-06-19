import React from "react";

function DashboardCard07({ data }) {
  return (
    <div className="bg-white border rounded-sm shadow-lg col-span-full xl:col-span-12 border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">
          Popular Transport Company
        </h2>
      </header>
      {data?.length ? (
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              {/* Table header */}
              <thead className="text-xs uppercase rounded-sm text-slate-400 bg-slate-50">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Company Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">DryvEarning</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      Company Earning
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      Ticket Count
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      Company Code
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100">
                {/* Row */}

                {data.map((item) => (
                  <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-slate-800">{item.companyName}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        #{item.dryvAfricaEarning}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">
                        #{item.totalCompanyEarning}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{item.soldTicketCount}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        {item.companyCode}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Row */}
                {/* <tr>
                  <td className="p-2">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 shrink-0 sm:mr-3"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <circle fill="#0E2439" cx="18" cy="18" r="18" />
                        <path
                          d="M14.232 12.818V23H11.77V12.818h2.46zM15.772 23V12.818h2.462v4.087h4.012v-4.087h2.456V23h-2.456v-4.092h-4.012V23h-2.461z"
                          fill="#E6ECF4"
                        />
                      </svg>
                      <div className="text-slate-800">Indiehackers.com</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">1.7K</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-green-500">#2,034</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">204</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500">3.9%</div>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-3">No Data</div>
      )}
    </div>
  );
}

export default DashboardCard07;
