import React from 'react';

function DashboardCard12() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">系统动态</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">最近24小时内的关键事件</p>
      </header>
      <div className="p-3">
        <div>
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">今天</header>
          <ul className="my-1">
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-violet-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow">
                  <div className="self-center text-gray-800 dark:text-gray-100">
                    新订单 <span className="font-medium text-violet-500">#20240418001</span> 已支付成功，金额 <span className="font-medium text-green-500">¥899</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">10分钟前</div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow">
                  <div className="self-center text-gray-800 dark:text-gray-100">
                    <span className="font-medium">王建国</span> 完成注册并成为新会员
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">45分钟前</div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-amber-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="grow flex items-center text-sm py-2">
                <div className="grow">
                  <div className="self-center text-gray-800 dark:text-gray-100">
                    本月营销活动 <span className="font-medium text-amber-500">"春季特惠"</span> 已获得 1,256 次点击
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">2小时前</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs font-semibold p-2">昨天</header>
          <ul className="my-1">
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-sky-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div className="grow">
                  <div className="self-center text-gray-800 dark:text-gray-100">
                    运营团队发布了新的产品 <span className="font-medium text-sky-500">SKU-20240417</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">10小时前</div>
                </div>
              </div>
            </li>
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <div className="grow flex items-center text-sm py-2">
                <div className="grow">
                  <div className="self-center text-gray-800 dark:text-gray-100">
                    订单 <span className="font-medium text-red-500">#20240417008</span> 申请退款，金额 <span className="font-medium text-red-500">¥299</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">16小时前</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
