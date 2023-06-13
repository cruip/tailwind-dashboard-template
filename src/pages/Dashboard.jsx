import React, { useState, useEffect } from "react";
import Page from "../partials/page";

import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Banner from "../partials/Banner";
import { getTerminals } from "../services/locationService";
import { useNavigate } from "react-router-dom";
import {
  getAllTransporter,
  getPopularTransporter,
} from "../services/transporterService";
import { getBookingStat } from "../services/bookingsService";
import { CreateRouteModal, CreateTerminalModal } from "../componets/modals";

function Dashboard() {
  const [terminals, setTerminals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [popCompanies, setPopCompanies] = useState([]);
  const [bookstat, setBookstat] = useState({
    completed: null,
    pending: null,
    canceled: null,
  });
  const [addRouteModal, setAddRouteModal] = useState(false);
  const [addTerminalModal, setAddTerminalModal] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/booking/pending");
  }

  const fetchBookStat = async () => {
    const { data } = await getBookingStat();
    data?.getBookingStatistics?.forEach((el) => {
      if (el._id === "completed") {
        setBookstat({
          ...bookstat,
          completed: { ...el },
        });
      } else if (el._id === "pending") {
        setBookstat({
          ...bookstat,
          pending: { ...el },
        });
      } else {
        setBookstat({
          ...bookstat,
          canceled: { ...el },
        });
      }
    });
  };

  const fetchPopTransport = async () => {
    const { data } = await getPopularTransporter();
    setPopCompanies(data?.getPopularCompany);
  };

  const fetchTerminals = async () => {
    const { data } = await getTerminals();
    setTerminals(data?.getTerminals?.nodes);
  };

  const fetchTransports = async (size = 10, page = 1) => {
    const { data } = await getAllTransporter(size, page);
    setCompanies(data?.getTransporters?.nodes);
  };

  const toggleAddRouteModal = () => {
    setAddRouteModal(!addRouteModal);
  };

  const toggleAddTerminalModal = () => {
    setAddTerminalModal(!addTerminalModal);
  };

  useEffect(() => {
    fetchTransports();
    fetchBookStat();
    fetchPopTransport();
    fetchTerminals();
  }, []);

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Page>
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="mb-8 sm:flex sm:justify-between sm:items-center">
        {/* Left: Avatars */}
        <DashboardAvatars companies={companies} />

        {/* Right: Actions */}
        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
        {/* Filter button */}
        {/* <FilterButton /> */}
        {/* Datepicker built with flatpickr */}
        {/* <Datepicker /> */}
        {/* Add view button */}
        {/* <button className="text-white bg-indigo-500 btn hover:bg-indigo-600">
                    <svg className="w-4 h-4 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden ml-2 xs:block">Add view</span>
                </button>                 */}

                 <button className="text-white bg-indigo-500 btn hover:bg-indigo-600" onClick={handleClick}>
                    <svg className="w-4 h-4 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden ml-2 xs:block">View Latest pending</span>
                </button>  
        </div>
      </div>

      {/* add buttons actions  */}
      <div className="flex items-center mb-3">
        <button
          className="mr-5 text-white bg-indigo-500 btn hover:bg-indigo-600"
          onClick={toggleAddRouteModal}
        >
          <svg
            className="w-4 h-4 opacity-50 fill-current shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden ml-2 xs:block">Add New Routes</span>
        </button>
        <button
          className="text-white bg-indigo-500 btn hover:bg-indigo-600"
          onClick={toggleAddTerminalModal}
        >
          <svg
            className="w-4 h-4 opacity-50 fill-current shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden ml-2 xs:block">Add New Terminals</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line chart (daily booking) */}
        <DashboardCard01 data={bookstat} />
        {/* Line chart (weekly booking) */}
        <DashboardCard02 data={bookstat} />
        {/* Line chart (monthly booking) */}
        <DashboardCard03 data={bookstat} />
        {/* Bar chart (Direct vs Indirect) */}
        {/* <DashboardCard04 /> */}
        {/* Line chart (Real Time Value) */}
        {/* <DashboardCard05 /> */}
        {/* Doughnut chart (Top Countries) */}
        {/* <DashboardCard06 /> */}
        {/* Table (Top companies) */}
        <DashboardCard07 data={popCompanies} />
        {/* Line chart (Sales Over Time) */}
        {/* <DashboardCard08 /> */}
        {/* Stacked bar chart (Sales VS Refunds) */}
        {/* <DashboardCard09 /> */}
        {/* Card (Customers) */}
        {/* <DashboardCard10 /> */}
        {/* Card (Reasons for Refunds) */}
        {/* <DashboardCard11 /> */}
        {/* Card (Recent Activity) */}
        {/* <DashboardCard12 /> */}
        {/* Card (Income/Expenses) */}
        {/* <DashboardCard13 /> */}
      </div>
      <CreateRouteModal
        show={addRouteModal}
        onHide={toggleAddRouteModal}
        terminals={terminals}
      />
      <CreateTerminalModal
        show={addTerminalModal}
        onHide={toggleAddTerminalModal}
      />
      {/* <CreateRouteModal shhow={addRouteModal}  onHide={toggleAddRouteModal}  terminals={terminals}/> */}
    </Page>
  );
}

export default Dashboard;
