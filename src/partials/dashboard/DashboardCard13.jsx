import React from 'react';

function DashboardCard13() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">收支记录</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">最近的资金往来明细</p>
      </header>
      <div className="p-3">
        <div>
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">今天</header>
          <ul className="my-1">
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <div className="text-gray-800 dark:text-gray-100">阿里云服务器</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">月度订阅</div>
                  </div>
                  <div className="shrink-0 self-center ml-2">
                    <span className="font-medium text-red-500">-¥498.00</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <div className="text-gray-800 dark:text-gray-100">微信支付结算</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">订单 #20240418001</div>
                  </div>
                  <div className="shrink-0 self-center ml-2">
                    <span className="font-medium text-green-500">+¥2,499.00</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <div className="text-gray-800 dark:text-gray-100">支付宝结算</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">订单 #20240418002</div>
                  </div>
                  <div className="shrink-0 self-center ml-2">
                    <span className="font-medium text-green-500">+¥899.00</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <div className="text-gray-800 dark:text-gray-100">抖音小店结算</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">批量结算 12 笔</div>
                  </div>
                  <div className="shrink-0 self-center ml-2">
                    <span className="font-medium text-green-500">+¥5,680.00</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <div className="grow flex items-center text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <div className="text-gray-800 dark:text-gray-100">员工工资发放</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">4月份薪资</div>
                  </div>
                  <div className="shrink-0 self-center ml-2">
                    <span className="font-medium text-red-500">-¥45,800.00</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard13;
