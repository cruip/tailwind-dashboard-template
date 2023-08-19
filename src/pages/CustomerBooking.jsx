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
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    bookingNo: "",
    email: "",
  });
  const [stat, setStat] = useState({
    pending: 0,
    completed: 0,
  });

  const date = new Date();

  let today = Date.parse(date);

  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const userId = userData?.authenticate?.user?._id;
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  };
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

  const fetchAllBookings = async (size = 10, page, filters) => {
    setTableLoad(true);
    const { data, loading } = await getAllBookings({
      size,
      page,
      filters: { ...filters },
    });
    // console.log(data?.getBookings, "bookings");
    setTableLoad(false);
    setData(data?.getBookings?.nodes);
    const pending = data?.getBookings?.nodes.filter(
      (item) => item.status === "pending"
    );
    const completed = data?.getBookings?.nodes.filter(
      (item) => item.status === "completed"
    );
    setStat({
      ...stat,
      pending: pending.length,
      completed: completed.length,
    });
    setTotalPages(
      Math.ceil(Number(data?.getBookings?.pageInfo?.totalItems) / limit)
    );
  };
  const fetchLocations = async () => {
    const { data } = await getTerminals();
    setLocation(data?.getTerminals?.nodes);
  };

  const searchBookingNo = async () => {
    if (searchFilters.bookingNo) {
      setTableLoad(true);
      await fetchAllBookings(10, currentPage, {
        name: "",
        bookingNo: searchFilters.bookingNo,
        email: "",
      });
    }
  };

  const searchBookingEmail = async () => {
    if (searchFilters.email) {
      setTableLoad(true);
      await fetchAllBookings(10, currentPage, {
        email: searchFilters.email,
      });
    }
  };
  const onFilter = () => {
    if (!searchQuery) fetchAllTransport();
    if (searchQuery) {
      const arrayData = data?.filter((item) => {
        if (
          item.name
            .toLowerCase()
            .trim()
            .includes(searchQuery.toLowerCase().trim())
        ) {
          return item;
        }
        return false;
      });
      setData(arrayData);
    }
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

  // useEffect(() => {
  //   if (searchFilters.email) {
  //     const getData = setTimeout(() => {
  //       fetchAllBookings(10, currentPage, {
  //         name: "",
  //         bookingNo: '',
  //         email: searchFilters.email,
  //       });

  //     }, 1000);

  //     return () => clearTimeout(getData);
  //   } else {
  //     fetchAllBookings(10, currentPage);
  //   }
  // }, [searchFilters.email]);

  useEffect(() => {
    fetchAllBookings(10, currentPage);
    if (!location.length) {
      fetchLocations();
    }
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
    "Booking No",
    "Email",
    "Amount Paid",
    "Seat No",
    "Status",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td className="multiple-span">
          {data?.passengers?.map((item, i) => (
            <span key={i}>{item.firstName}</span>
          ))}
        </td>
        <td>{data?.bookingNo}</td>
        <td>{data?.email}</td>
        <td>N{data?.amount}</td>
        <td className="multiple-span">
          <p className="w-14 md:w-20">
            {data?.seatNumbers?.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </td>
        <td>{data?.status ? data?.status : "Unknown"}</td>

        <td>
          <DropDown
            links={[
              {
                name: "View Booking",
                isLink: true,
                onclick: () => {},
                link: `${data?._id}`,
              },
              data?.status !== "completed" && {
                name: "Confirm Booking",
                isLink: false,
                onclick: () => {
                  setId(data?._id);
                  setStatus("completed");
                  toggleConfirmModal();
                },
              },
              data?.status !== "cancelled" && {
                name: "Cancel Booking",
                isLink: false,
                onclick: () => {
                  setId(data?._id);
                  setStatus("cancelled");
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            name={"Total Completed Bookings"}
            description="Total Number of completed bookings"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">
                {stat.completed}
              </span>{" "}
              Seats
            </h3>
          </Card>
          <Card
            name={"Total Pending Bookings"}
            description="Total Number of pending bookings"
          >
            <h3 className="mt-5 text-right ">
              <span className="text-xl font-semibold text-sky-800">
                {stat.pending}
              </span>{" "}
              Seats
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage Booking"} width="w-full">
            <div className="flex items-center justify-between w-full mt-2 ">
              <div className="flex items-center">
                <input
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none border-slate-500 focus:outline-none focus:shadow-outline"
                  id="id"
                  onChange={handleSearchChange}
                  value={searchFilters.bookingNo}
                  type="text"
                  name="bookingNo"
                  placeholder="search with booking No"
                />
                <button
                  className="px-2 py-2 ml-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={searchBookingNo}
                >
                  search
                </button>
              </div>
              <div className="flex items-center">
                <input
                  className="w-2/3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none border-slate-500 focus:outline-none focus:shadow-outline"
                  id="id"
                  onChange={handleSearchChange}
                  value={searchFilters.email}
                  type="email"
                  name="email"
                  placeholder="search with email"
                />
                <button
                  className="px-2 py-2 ml-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={searchBookingEmail}
                >
                  search
                </button>
              </div>
              {/* <div className="flex items-center">
                <label html="search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="email"
                    id="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search customer by email"
                    required
                    onChange={handleSearchChange}
                    value={searchFilters.email}
                    name="email"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <SVGIcon name="search" />
                  </button>
                </div>
              </div> */}
            </div>
            <div className="mt-10">
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
        callBack={fetchAllBookings}
      />
    </Page>
  );
};

export default CustomerBooking;
