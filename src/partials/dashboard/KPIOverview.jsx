import React from 'react';

function KPIOverview() {
  const kpiData = [
    {
      title: '本月营收',
      value: '¥128,459',
      change: '+12.5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      iconColor: 'text-violet-500',
    },
    {
      title: '活跃用户',
      value: '8,642',
      change: '+8.2%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: 'bg-sky-50 dark:bg-sky-900/20',
      iconColor: 'text-sky-500',
    },
    {
      title: '订单量',
      value: '2,156',
      change: '-3.1%',
      trend: 'down',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-500',
    },
    {
      title: '转化率',
      value: '4.8%',
      change: '+0.5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {kpiData.map((kpi, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5 hover:shadow-sm transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{kpi.title}</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{kpi.value}</div>
              <div className={`mt-2 inline-flex items-center text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${
                  kpi.trend === 'up' 
                    ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400' 
                    : 'bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                }`}>
                  {kpi.trend === 'up' ? (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {kpi.change}
                </span>
                <span className="text-gray-400 dark:text-gray-500 ml-2 text-xs">vs 上月</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
              <span className={kpi.iconColor}>{kpi.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KPIOverview;
