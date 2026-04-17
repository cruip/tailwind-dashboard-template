import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: '张明远',
      email: 'zhangmingyuan@qq.com',
      location: '��',
      spent: '¥2,890',
      lastOrder: '3天前',
    },
    {
      id: '1',
      image: Image02,
      name: '李晓华',
      email: 'lixiaohua@gmail.com',
      location: '��',
      spent: '¥2,456',
      lastOrder: '5天前',
    },
    {
      id: '2',
      image: Image03,
      name: '王建国',
      email: 'wangjianguo@163.com',
      location: '��',
      spent: '¥3,120',
      lastOrder: '1天前',
    },
    {
      id: '3',
      image: Image04,
      name: '陈美玲',
      email: 'chenmeiling@outlook.com',
      location: '��',
      spent: '¥1,890',
      lastOrder: '1周前',
    },
    {
      id: '4',
      image: Image05,
      name: '刘洋',
      email: 'liuyang@icloud.com',
      location: '��',
      spent: '¥2,150',
      lastOrder: '2天前',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">高价值客户</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">累计消费金额最高的客户</p>
      </header>      
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">客户</div>
                </th>
                <th className="p-2 whitespace-nowrap hidden sm:table-cell">
                  <div className="font-semibold text-left">邮箱</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">消费</div>
                </th>
                <th className="p-2 whitespace-nowrap hidden md:table-cell">
                  <div className="font-semibold text-center">最近下单</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-left text-gray-500 dark:text-gray-400">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap hidden md:table-cell">
                        <div className="text-center text-gray-500 dark:text-gray-400">{customer.lastOrder}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
