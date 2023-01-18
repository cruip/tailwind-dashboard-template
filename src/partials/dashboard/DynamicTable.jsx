import React from "react";
import KCA from "../../images/kca.png";
import Fairmont from "../../images/fairmont.png";
import Insighters from "../../images/insighters.png";
import LaRoche from "../../images/laroche.jpeg";

export const DynamicTable = ({ data, nameAlias, tableTitle, size }) => {
  console.log(data);
  return (
    <div
      className={`col-span-full ${
        size === "small" ? `xl:col-span-5` : `xl:col-span-12`
      } bg-white shadow-lg rounded-sm border border-slate-200`}
    >
      <header className="px-5 py-4 border-b border-slate-100 flex flex-row justify-between">
        <h2 className="font-semibold text-slate-800">{tableTitle}</h2>
        {size === "large" ? (
          <div className=" w-8 font-semibold text-white px-1.5 bg-indigo-500 rounded-full">
            {data.length}
          </div>
        ) : null}
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    {nameAlias ? nameAlias : "Name"}
                  </div>
                </th>

                {data[0].link ? (
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Link</div>
                  </th>
                ) : null}
                {data[0].description && !data[0].link ? (
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Description</div>
                  </th>
                ) : null}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {data.map((data) => {
                return (
                  <tr key={data.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        {data.image ? (
                          <div className="w-5 h-5 shrink-0 mr-4 sm:mr-3 ">
                            <img
                              className="h-full w-full"
                              src={data.image}
                              width="40"
                              height="40"
                              alt={data.name}
                            />
                          </div>
                        ) : null}
                        <div className="font-medium text-slate-800 ml-2">
                          {data.name}
                        </div>
                      </div>
                    </td>
                    {data.link ? (
                      <td className="p-2 ">
                        <a
                          className="font-medium text-xs text-indigo-500 hover:text-indigo-600"
                          href={data.link}
                          target="_blank"
                        >
                          {data.description ? data.description : "View"}
                          <span className="hidden sm:inline"> -&gt;</span>
                        </a>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
