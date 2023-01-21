import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardCard from "../partials/dashboard/DashboardCard";
import Demographics from "../partials/dashboard/Demographics";
import TopChannels from "../partials/dashboard/TopChannels";
import Customers from "../partials/dashboard/Customers";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import Banner from "../partials/Banner";
import { Rates } from "../partials/dashboard/Rates";

import CBS from "../images/cbs.png";
import NBC from "../images/nbc.png";
import TODAY from "../images/Today_logo.svg.png";
import INSIDE_EDITION from "../images/inside-edition.png";
import INSIDE from "../images/insider.png";
import KAISER from "../images/kaiser.png";
import SEVEN_NEWS from "../images/7news.png";
import YAHOO from "../images/yahoo.jpeg";
import NIH from "../images/NIH.png";
import MSN from "../images/msn.png";
import KCCURE from "../images/kccure.png";

import PhotoTitleLinkTable, {
  DynamicTable,
} from "../partials/dashboard/DynamicTable";
import { articles, podcasts, socialData } from "../utils/Data";

export const News = ({type}) => {

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner type={type} />

            <div className="text-3xl font-bold text-slate-800 mt-20 mb-7">
              News and Articles
            </div>

              <DynamicTable
                data={articles}
                tableTitle={"News/Articles"}
                size="large"
              />
            </div>
        </main>

        <Banner />
      </div>
    </div>
  );
};

export default News;
