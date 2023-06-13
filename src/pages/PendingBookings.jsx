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

const PendingBooking = () => {
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

  var OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
  
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
    const newData = data?.getBookings?.nodes.filter((items) => new Date(items.bookingDate).getTime() < OneDay && items.status === 'pending')
    setData(newData);
    
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

  

  useEffect(() => {
    fetchAllBookings(10, currentPage);
    if (!location.length) {
      fetchLocations();
    }
  }, [currentPage]);

 
  const tableHeader = [
    "Passengers Name",
    "Booking No",
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
            <span key={i}>{item.firstName}</span>
          ))}
        </td>
        <td>{data?.bookingNo}</td>
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
                link: `/booking${data?._id}`,
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

export default PendingBooking;
