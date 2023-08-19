import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { Card } from "../partials/card/Card";
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Table } from "../partials/table";
import { Link, useParams } from "react-router-dom";
import Modal from "../partials/modal/Modal";
import Loader from "../partials/Loader";
import { getSingleUsers } from "../services/userService";
import { getAllBookings } from "../services/bookingsService";
import { getAllRoutes } from "../services/routeService";

const Customer = () => {
  const { id } = useParams();
  const [limit, setLimit] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [data, setData] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const fetchUser = async (id) => {
    const { data, errors } = await getSingleUsers(id);
    setTableLoad(false);
    setData(data.getUser);
  };


  const fetchAllRoutes = async () => {
    const { data } = await getAllRoutes(1, 10000);
    setRoutes(data?.getRoutes?.nodes);
  };

  const toggleDeactivateModal = () => {
    setDeactivateModal(!deactivateModal);
  };

  const toggleActivateModal = () => {
    setActivateModal(!activateModal);
  };

  const toggleEmailModal = () => {
    setEmailModal(!emailModal);
  };

  const togglePasswordModal = () => {
    setPasswordModal(!passwordModal);
  };

  const onPrevPage = () => {};

  const onNextPage = () => {};

  useEffect(() => {
    fetchUser(id);
    fetchAllRoutes();
  }, []);

  const getRoute = (id) => {
    const route = routes?.find((item) => {
      return item._id === id;
    });
    return route?.name;
  };

  const tableHeader = [
    "Route",
    "Passenger Name(s)",
    "Amount(N)",
    "Booking Date",
  ];

  const tableRow = (booking) => {
    return (
      <tr key={booking?._id} className="border-b-2 border-slate-200">
        <td>{useMemo(() => getRoute(booking?.route), [routes])}</td>
        <td>
          {" "}
          {booking?.passengers?.map((item, i) => (
            <span key={i}>{item.name}{i < booking?.passengers?.length - 1 ? ', ' : '' }</span>
          ))}
        </td>
        <td>{booking?.amount}</td>
        <td>{moment(booking?.bookingDate).format(" MMM Do, YYYY | h:mm a")}</td>
      </tr>
    );
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <Loader />
      </div>
    );
  }

  return (
    <Page>
      <div>
        <Link to={"/customers"}>
          <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to {data?.firstName || ""} {data?.lastName || ""} Profile
      </h2>
      <div className="w-full mx-auto mt-8 xl:w-4/5">
        <Card width="w-full">
          <div className="grid grid-cols-2 gap-3 ">
            <h5 className="w-1/2 mb-4 text-slate-600">
              <span> Customer Name</span>
              <br />
              <span className=" text-slate-900">
                {data?.firstName || ""} {data?.lastName || ""}
              </span>
            </h5>
            <h5 className="w-1/2 mb-4 text-slate-600">
              <span> Customer Email</span>
              <br />
              <span className=" text-slate-900">{data?.email || "N/A"}</span>
            </h5>
            <h5 className="w-1/2 mb-4 text-slate-600">
              <span> Customer Phone</span>
              <br />
              <span className=" text-slate-900"> {data?.phoneNo || "N/A"}</span>
            </h5>
          </div>
          <h2 className="mt-3 mb-4 text-xl font-semibold text-slate-600">
            List of customer transport History
          </h2>
          <div className="mt-5 ">
                      <Table
                        data={data.bookings}
                        onNext={onNextPage}
                        onPrev={onPrevPage}
                        currentPage={currentPage}
                        totalPages={1}
                        emptyMessage="No bookings"
                        loadingText="Loading bookings..."
                        loading={tableLoad}
                        rowFormat={tableRow}
                        headers={tableHeader}
                        paginated={false}
                      />
                    </div>
        </Card>
      </div>

      {/* //modals */}
   
    </Page>
  );
};

export default Customer;
