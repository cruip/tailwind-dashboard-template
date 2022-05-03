import React from 'react';

function CardGuarantor() {
  return (
    <div className="col-span-full h-full xl:col-span-12 bg-white shadow-lg rounded-xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-primary-900">Ranking Guarantor by Aging</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Rank</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Guarantor</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Aging (Days)</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">1</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">PT. Fullerton Health Indonesia</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">5</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">2</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MANDIRI INHEALTH MI CARE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">6</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">3</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">ADMEDIKA - OJK</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">6</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">4</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">FULLERTON - PT. ASYKI</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">6</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">5</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">7</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-sky-500"></div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">...</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500"></div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">25</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">57</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">26</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">58</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">27</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">59</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">28</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">67</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">29</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">71</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-slate-800">30</div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">MEDITAP - LIPPO GENERAL INSURANCE</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">75</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CardGuarantor;
