import React from "react";

function WelcomeBanner() {
  return (
    <div className="relative sm:p-4 rounded-sm overflow-hidden ">
      {/* Content */}
      <div className="">
        <h1 className="font-medium text-neutral-300 hidden md:block">Dashboard Revenue</h1>
        <h1 className="font-bold text-primary-600 lg:text-2xl">Dashboard</h1> {/* ini harus responsive sama navbar */}
      </div>
    </div>
  );
}

export default WelcomeBanner;
