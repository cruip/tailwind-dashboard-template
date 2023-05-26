import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import Modal from "../partials/modal/Modal";
import { SVGIcon } from "../partials/icons/SvgIcon";
import {
  getAllBookings,
  cancelConfirmBooking,
} from "../services/bookingsService";
import { getAllRoutes } from "../services/routeService";
import { getAllLocations, getTerminals } from "../services/locationService";
import { BookSeatModal, ToggleStatusModal } from "../componets/modals";
import { ToastContainer, toast } from "react-toastify";

const CustomerBooking = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [tableLoad, setTableLoad] = useState(true);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);
  const [location, setLocation] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);

  const date = new Date("2023-05-10");
  console.log(date.getDate(), "date");

  let today = Date.parse(date);

  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const userId = userData?.authenticate?.user?._id;

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
  };

  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const toggleBookModal = () => {
    setBookModal(!bookModal);
  };

  const fetchAllBookings = async (size = 10, page) => {
    const { data, loading } = await getAllBookings({ size, page });
    // console.log(data?.getBookings, "bookings");
    setTableLoad(false);
    setData(data?.getBookings?.nodes);
    setTotalPages(
      Math.ceil(Number(data?.getBookings?.pageInfo?.totalItems) / limit)
    );
  };
  const fetchLocations = async () => {
    const { data } = await getTerminals();
    console.log(data, "terminals");
    setLocation(data?.getTerminals?.nodes);
  };

  // const fetchAllRoutes = async () => {
  //   const { data } = await getAllRoutes(1, 10000);
  //   // console.log(data, "routes");
  //   setRoutes(data?.getRoutes?.nodes);
  //   // const location = {};
  //   // data?.getRoutes?.nodes?.map((item) => {
  //   //   location[item.from.city] = item.from;
  //   // });

  //   // setLocationCities(Object.values(location));
  // };

  // const handlBookingStatus = (id, status) => {
  //   cancelConfirmBooking({
  //     bookingId: id,
  //     status: status,
  //   })
  //     .then(async (r) => {
  //       toast.success(
  //         `${
  //           status == "false"
  //             ? "Booking cancelled succesfully"
  //             : "Booking Confirmed"
  //         }`
  //       );
  //       await fetchAllBookings();
  //       setId("");
  //     })
  //     .catch(() => toast.error("Oops! something went wrong"));
  // };

  useEffect(() => {
    // fetchAllBookings();
    // fetchAllRoutes()
    fetchLocations();

    return () => {
      setData(null); // This worked for me
    };
  }, []);

  useEffect(() => {
    fetchAllBookings(10, currentPage);
  }, [currentPage]);

  // const getRoute = (id) => {
  //   console.log(id, 'route');
  //   const route = routes?.find((item) => {
  //     return item._id === id;
  //   });
  //   return route?.name;
  // };

  const tableHeader = [
    "Passengers Name",
    // "Route",
    "Amount Paid",
    "Seat No",
    "staus",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td className="multiple-span">
          {data?.passengers?.map((item, i) => (
            <span key={i}>{item.name}</span>
          ))}
        </td>
        {/* <td>{getRoute(data?.route)}</td> */}
        <td>N{data?.amount}</td>
        <td className="multiple-span">
          {data?.seatNumbers?.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </td>
        <td>{data?.status ? data?.status : "Unknown"}</td>

        <td>
          <DropDown
            links={[
              data?.status !== "pending"
                ? {
                    name: "cancel Booking",
                    isLink: false,
                    onclick: () => {
                      setId(data?._id);
                      setStatus("false");
                      toggleConfirmModal();
                    },
                  }
                : {
                    name: "Confirm Booking",
                    isLink: false,
                    onclick: () => {
                      setId(data?._id);
                      setStatus("true");
                      toggleConfirmModal();
                    },
                  },
              Date.parse(data?.departureDate) >= today
                ? {
                    name: "Reschedule Booking",
                    isLink: false,
                    onclick: () => {
                      setId(data?._id);
                      toggleConfirmModal();
                    },
                  }
                : {
                    name: "View Invoice",
                    isLink: false,
                    onclick: () => {
                      console.log("lol");
                      // toggleConfirmModal();
                    },
                  },
            ]}
          />
        </td>
      </tr>
    );
  };

  return (
    <Page>
      <ToastContainer />
      <section>
        <div className="flex items-center justify-between mb-6">
          <p>Book a seat</p>
          <button
            className="px-4 py-2 text-white transition-shadow duration-150 rounded-md shadow-md w-52 bg-sky-800 hover:shadow-lg"
            onClick={toggleBookModal}
          >
            Book Seat
          </button>
        </div>
        <div className="gap-8 columns-1 md:columns-2">
          <div className="mb-6">
            <Card
              name={"Total Seat Booked"}
              description="Total Number of booked seats"
            >
              <h3 className="mt-5 text-right">
                <span className="text-xl font-semibold text-sky-800">
                  {data?.length}
                </span>{" "}
                Seats
              </h3>
            </Card>
          </div>
          <Card
            name={"Total Unbooked Seat"}
            description="Total Number of Unbooked seats"
          >
            <h3 className="mt-5 text-right ">
              <span className="text-xl font-semibold text-sky-800">0</span>{" "}
              Seats
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage Booking"} width="w-full">
            <div className="flex items-center justify-end w-full ">
              <div className="flex items-center">
                <label html="search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search customer"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <SVGIcon name="search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 overflow-x-auto">
              <Table
                data={data}
                onNext={onNextPage}
                onPrev={onPrevPage}
                currentPage={currentPage}
                totalPages={totalPages}
                emptyMessage="No Data"
                loadingText="Loading Data..."
                loading={tableLoad}
                rowFormat={tableRow}
                headers={tableHeader}
                paginated={data?.length > 0}
              />
            </div>
          </Card>
        </div>
      </section>
      {/* <Modal
        show={cancelModal}
        size="md"
        onHide={toggleCancelModal}
        buttonText="Cancel Booking"
        onclick={() => handlBookingStatus(id, "false")}
      >
        <p>Do you want to cancel this booking? </p>
      </Modal>
      <Modal
        show={confirmModal}
        size="md"
        onHide={toggleConfirmModal}
        buttonText="confirm"
        onclick={() => handlBookingStatus(id, "true")}
      >
        <p>Confirm this bookig</p>
      </Modal> */}
      <ToggleStatusModal
        show={confirmModal}
        status={status}
        onHide={toggleConfirmModal}
        id={id}
        callBack={fetchAllBookings}
      />
      <BookSeatModal
        show={bookModal}
        onHide={toggleBookModal}
        location={location}
      />
    </Page>
  );
};

export default CustomerBooking;
