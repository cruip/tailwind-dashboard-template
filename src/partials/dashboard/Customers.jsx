import React from "react";
import KCA from "../../images/kca.png";
import Fairmont from "../../images/fairmont.png";
import Insighters from "../../images/insighters.png";
import LaRoche from "../../images/laroche.jpeg";

export const Customers = () => {
  const customers = [
    {
      id: "0",
      image: KCA,
      name: "Kidney Cancer Association",
      link: "https://www.instagram.com/stories/highlights/17938347025976941/",
    },
    {
      id: "1",
      image: Fairmont,
      name: "Fairmont Hotel",
      link: "https://www.instagram.com/p/Ce7EiclFGK_/?utm_source=ig_web_copy_link",
    },
    {
      id: "2",
      image: LaRoche,
      name: "La Rose-Posey",
      link: "https://www.tiktok.com/@katiekickscancer/video/7166407632641838382?is_from_webapp=1&sender_device=pc&web_id=7173108844850923050",
    },
    {
      id: "3",
      image: Insighters,
      name: "The Insighters",
    },
  ];

  return (
    <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Collaborations</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Link</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-8 shrink-0 mr-6 sm:mr-3 ">
                          <img
                            className="h-full w-full"
                            src={customer.image}
                            width="40"
                            height="40"
                            alt={customer.name}
                          />
                        </div>
                        <div className="font-medium text-slate-800 ml-4">
                          {customer.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <a
                        className="font-medium text-xs text-indigo-500 hover:text-indigo-600"
                        href={customer.link}
                        target="_blank"
                      >
                        View<span className="hidden sm:inline"> -&gt;</span>
                      </a>
                    </td>
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

export default Customers;
