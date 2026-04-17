import React from 'react';

function DashboardCard07() {
  const channels = [
    {
      name: '微信公众号',
      icon: (
        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
          <circle fill="#07C160" cx="18" cy="18" r="18" />
          <path
            d="M18 7.5c-6.35 0-11.5 4.03-11.5 9s5.15 9 11.5 9 11.5-4.03 11.5-9-5.15-9-11.5-9zm-5.75 12a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm11.5 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm-8.75-3.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm6 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
            fill="#FFF"
          />
        </svg>
      ),
      visitors: '3.2K',
      revenues: '¥5,877',
      sales: 342,
      conversion: '5.3%',
    },
    {
      name: '抖音',
      icon: (
        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
          <circle fill="#000000" cx="18" cy="18" r="18" />
          <path
            d="M19.5 8.25h-3v10.5a2.25 2.25 0 01-4.5 0v-1.5a.75.75 0 00-1.5 0v1.5a3.75 3.75 0 107.5 0V13.5a6.75 6.75 0 005.25 2.56v-3.06a4.5 4.5 0 01-3.75-2.25z"
            fill="#FFF"
          />
        </svg>
      ),
      visitors: '2.8K',
      revenues: '¥4,426',
      sales: 289,
      conversion: '4.9%',
    },
    {
      name: '小红书',
      icon: (
        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
          <circle fill="#FE2C55" cx="18" cy="18" r="18" />
          <path
            d="M12 10.5a1.5 1.5 0 013 0v15a1.5 1.5 0 01-3 0v-15zm4.5 0a1.5 1.5 0 013 0v15a1.5 1.5 0 01-3 0v-15zm4.5 0a1.5 1.5 0 013 0v15a1.5 1.5 0 01-3 0v-15z"
            fill="#FFF"
          />
        </svg>
      ),
      visitors: '2.4K',
      revenues: '¥3,244',
      sales: 256,
      conversion: '4.5%',
    },
    {
      name: '淘宝直通车',
      icon: (
        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
          <circle fill="#FF5000" cx="18" cy="18" r="18" />
          <path
            d="M18 9l-7.5 4.5v9L18 27l7.5-4.5v-9L18 9zm0 2.5l4.5 2.7v5.6L18 22.5l-4.5-2.7v-5.6L18 11.5z"
            fill="#FFF"
          />
        </svg>
      ),
      visitors: '1.9K',
      revenues: '¥2,836',
      sales: 210,
      conversion: '4.2%',
    },
    {
      name: '知乎',
      icon: (
        <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
          <circle fill="#0084FF" cx="18" cy="18" r="18" />
          <path
            d="M12 10h3v16h-3V10zm5 0h3v16h-3V10zm5 0h3v16h-3V10z"
            fill="#FFF"
          />
        </svg>
      ),
      visitors: '1.5K',
      revenues: '¥1,934',
      sales: 178,
      conversion: '3.8%',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">流量渠道分析</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">各渠道访客、收入及转化情况</p>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">渠道</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">访客数</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">收入</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">订单数</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">转化率</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {channels.map((channel, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <div className="flex items-center">
                      {channel.icon}
                      <div className="text-gray-800 dark:text-gray-100">{channel.name}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{channel.visitors}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-green-500">{channel.revenues}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{channel.sales}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500">{channel.conversion}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
