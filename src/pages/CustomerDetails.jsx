import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { Card } from "../partials/card/Card";
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Table } from "../partials/table";
import { Link, useParams } from "react-router-dom";
import Modal from "../partials/modal/Modal";
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
    setData(data.getUser);
  };

  const fetchAllBookings = async () => {
    const { data, loading } = await getAllBookings(1, 1000);
    setTableLoad(false);
    const filterBookings = data?.getBookings?.nodes?.filter((item) => {
      if (item.user?._id == id) {
        return item;
      }
      return false;
    });
    setBookings(filterBookings);
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
    fetchAllBookings();
    fetchAllRoutes()
  }, []);

  const getRoute = (id) => {
    const route = routes?.find((item) => {
      return item._id === id;
    });
    return route?.name;
  };

  const tableHeader = ["Route", "Passenger Name(s)", "Amount(N)", "Booking Date"];

  const tableRow = (booking) => {
    return (
      <tr key={booking?._id} className="border-b-2 border-slate-200">
        <td>{useMemo(() => getRoute(booking?.route), [routes])}</td>
        <td>
          {" "}
          {booking?.passengers?.map((item, i) => (
            <span key={i}>{item.name}</span>
          ))}
        </td>
        <td>{booking?.amount}</td>
        <td>{moment(booking?.bookingDate).format(" MMM Do, YYYY | h:mm a")}</td>
      </tr>
    );
  };

  if (!data) {
    return <h2>Loading</h2>;
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
          <Tabs defaultTab={0}>
            <Tab label="Profile" tabIndex={0} />
            <Tab label="Booking Details" tabIndex={1} />
            <div className="mt-4 ">
              <TabPane tabIndex={0}>
                <div className="mt-5 ">
                  <h2 className="mb-4 text-xl font-semibold text-slate-800">
                    Customer name: {data?.firstName || ""}{" "}
                    {data?.lastName || ""}
                  </h2>
                  <h3 className="mb-2 text-lg text-slate-600">
                    email: {data?.email || ""}
                  </h3>
                  <h3 className="mb-2 text-lg text-slate-600">
                    Verified?: {data?.isEmailVerified || "false"}
                  </h3>
                  <h3 className="mb-2 text-lg text-slate-600">
                    Phone: {data?.phoneNo || ""}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center mt-6">
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={toggleDeactivateModal}
                  >
                    Deactivate Account
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => toggleActivateModal()}
                  >
                    Re Activate Account
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => toggleEmailModal()}
                  >
                    Change Email
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => togglePasswordModal()}
                  >
                    Change Password
                  </button>
                </div>
              </TabPane>
              <TabPane tabIndex={1}>
                <div className="mt-5 ">
                  <h2 className="mb-4 text-xl font-semibold text-slate-800">
                    List of customer transport History
                  </h2>
                  <Card description={"view customer booking history"} width="w-full">
                    <div className="mt-10 ">
                      <Table
                        data={bookings}
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
              </TabPane>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* //modals */}
      <Modal
        show={deactivateModal}
        size="md"
        onHide={toggleDeactivateModal}
        buttonText="De-Activate"
      >
        <p>Do you want to Deactivate this account? </p>
      </Modal>
      <Modal
        show={activateModal}
        size="md"
        onHide={toggleActivateModal}
        buttonText="Activate"
      >
        <p>Reactivate this Customer</p>
      </Modal>
      <Modal show={emailModal} size="md" onHide={toggleEmailModal}>
        <p>Change customer email</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Input New Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="dryvafrica@dryvafrica.com"
            />
          </div>
        </div>
      </Modal>
      <Modal show={passwordModal} size="md" onHide={togglePasswordModal}>
        <p>Change Customer Password</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Input new password
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default Customer;
