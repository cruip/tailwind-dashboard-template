import React from "react";
import { Card } from "../partials/card/Card";
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Link } from "react-router-dom";

const CustomerBookingDetail = () => {
  return (
    <Page>
        <div >
            <Link to={'/booking'}>
        <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">Back</button>
        </Link>
        </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to Victors Booking Page
      </h2>
      <div className="w-full mx-auto mt-8 xl:w-4/5">
        <Card width="w-full">
          <Tabs defaultTab={0}>
            <Tab label="Profile" tabIndex={0} />
            <Tab label="Travel history" tabIndex={1} />
            <div className="mt-4 ">
              <TabPane tabIndex={0}>
                <div className="mt-5 ">
                  <h2 className="mb-4 text-xl font-semibold text-slate-800">Customer name: Victor Chukwu</h2>
                  <h3 className="mb-2 text-lg text-slate-600">email: okenwa1993@gmail.com</h3>
                  <h3 className="mb-2 text-lg text-slate-600">Adress: Okestina close enugu</h3>
                  <h3 className="mb-2 text-lg text-slate-600">Phone: 07023880693</h3>
                  
                </div>
                <div className="flex flex-wrap items-center mt-6">
                    <button className="py-3 mb-3 text-white bg-blue-600 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600">View Invoice</button>
                    <button className="py-3 mb-3 text-white bg-blue-600 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600">Cancel Booking</button>
                    <button className="py-3 mb-3 text-white bg-blue-600 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600">Reschedule Booking</button>
                    <button className="py-3 mb-3 text-white bg-blue-600 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600">Confirm Booking</button>
                    <button className="py-3 mb-3 text-white bg-blue-600 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600">Change Pasenger's status</button>
                </div>
              </TabPane>
              <TabPane tabIndex={1}>
                <div className="mt-5 ">
                    <h2 className="mb-4 text-xl font-semibold text-slate-800">List of customer transport History</h2>
                </div>
              </TabPane>
            </div>
          </Tabs>
        </Card>
      </div>
    </Page>
  );
};

export default CustomerBookingDetail;
