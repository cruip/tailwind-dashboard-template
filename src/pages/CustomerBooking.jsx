import React, { useEffect, useState, useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import Modal from "../partials/modal/Modal";
import { SVGIcon } from "../partials/icons/SvgIcon";
import { getAllBookings, createBooking } from "../services/bookingsService";
import { getAllRoutes } from "../services/routeService";
import { getAllTransporter } from "../services/transporterService";
import { ToastContainer, toast } from "react-toastify";

const CustomerBooking = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [tableLoad, setTableLoad] = useState(true);
  const [data, setData] = useState(null);
  const [availableSeat, setAvailableSeat] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [transports, setTransports] = useState(null);
  const [filterRoutes, setFilterRoutes] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [values, setValues] = useState({
    from: "",
    to: "",
    departureDate: "",
    returningDate: "",
    route: "",
    transporter: "",
    amount: "",
    phone: "",
    email: "",
    name: "",
    gender: "",
    age: "",
    tripType: "Round Trip",
    passengerType: "adult",
  });

  const [seatNumbers, setSeatNumbers] = useState('')

  const date = new Date();

  const [locationCities, setLocationCities] = useState(null);
  const [destinationCities, setDestinationCities] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.authenticate?.user?._id;

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchAllBookings = async () => {
    const { data, loading } = await getAllBookings();
    console.log(data?.getBookings, "bookings");
    setTableLoad(false);
    setData(data?.getBookings?.nodes);
    setTotalPages(
      Math.ceil(Number(data?.getBookings?.pageInfo?.totalItems) / limit)
    );
  };

  const fetchAllRoutes = async () => {
    const { data } = await getAllRoutes(1, 10000);
    console.log(data, "routes");
    setRoutes(data?.getRoutes?.nodes);
    const location = {};
    data?.getRoutes?.nodes?.map((item) => {
      location[item.from.city] = item.from
    });

    console.log(Object.values(location), data?.getRoutes?.nodes, 'heyye');

    setLocationCities(Object.values(location));
  };

  const fetchAllTransport = async () => {
    const { data, loading } = await getAllTransporter(1, 100000);
    console.log(data?.getTransporters, "llol");
    setTransports(data?.getTransporters?.nodes);
  };

  const handleBooking = () => {
    if (Object.values(values).some((o) => o === "") && !seatNumbers) return false;
    createBooking({
      ...values,
      status: "true",
      bookingDate: date,
      user: userId,
      seatNumbers: parseInt(seatNumbers)
      
    })
      .then(() => {
        toast.success("seat booked successfully");
        setValues({
          from: "",
          to: "",
          departureDate: "",
          returningDate: "",
          route: "",
          transporter: "",
          amount: "",
          phone: "",
          email: "",
          name: "",
          gender: "",
          age: "",
          tripType: "",
          passengerType: "",
        });
      })
      .catch(() => toast.error("Oops! something went wrong"));
  };

  useEffect(() => {
    fetchAllBookings();
    fetchAllRoutes();
    fetchAllTransport();
  }, []);

  useEffect(() => {
    if (values.from) {
      let destination = {};
      routes?.map((item) => {
       destination[item.to.city] = item.to
      });

      setDestinationCities(Object.values(destination));
    }
  }, [values.from]);

  useEffect(() => {
    if (values.to && values.from) {
      const filterdRoutes = routes?.filter((item) => {
        if (
          item.from?._id
            ?.toLowerCase()
            .trim()
            .includes(values.from.toLowerCase().trim()) &&
          item.to?._id
            ?.toLowerCase()
            .trim()
            .includes(values.to.toLowerCase().trim())
        ) {
          return item;
        }
        return false;
      });
      
      setFilterRoutes(filterdRoutes);
      console.log(filterdRoutes, 'filter', filterRoutes);
    }
  }, [values.to, values.from]);

  useEffect(() => {
     if(values.route){
      let route = routes?.find((item) => item._id == values.route)
      let transport = transports?.find((item) => item._id == route?.bus?.transporter?._id)
      setValues({
        ...values,
        transporter: transport._id,
        amount: route?.price
      })
      // setAvailableSeat(route?.bus?.availableSeats)
      setAvailableSeat([1, 2, 3, 4, 5, 6])
     }
  }, [values.route])


  const getRoute = (id) => {
    const route = routes?.find((item) => {
      return item._id === id;
    });
    return route?.name;
  };

  const tableHeader = [
    "Passengers Name",
    "Route",
    "Amount Paid",
    "Seat No",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>
          {data?.passengers?.map((item, i) => (
            <span key={i}>{item.name}</span>
          ))}
        </td>
        <td>{useMemo(() => getRoute(data?.route), [routes])}</td>
        <td>N{data?.amount}</td>
        <td>
          {data?.seatNumbers?.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </td>

        <td>
          <DropDown
            links={[
              {
                name: "View Booking",
                isLink: true,
                onclick: () => {},
                link: `${data._id}`,
              },
              {
                name: "cancel Booking",
                isLink: false,
                onclick: () => {
                  toggleCancelModal();
                },
                link: "",
              },
              {
                name: "Confirm Booking",
                isLink: false,
                onclick: () => {
                  toggleConfirmModal();
                },
                link: "",
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
            className="px-4 py-2 text-white rounded-md w-52 bg-sky-800"
            onClick={toggleBookModal}
          >
            Book Seat
          </button>
        </div>
        <div className="gap-8 columns-2">
          <Card
            name={"Total Seat Booked"}
            description="Total Number of booked seats"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">{data?.length}</span>{" "}
              Seats
            </h3>
          </Card>
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
            <div className="mt-10 ">
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
      <Modal
        show={cancelModal}
        size="md"
        onHide={toggleCancelModal}
        buttonText="Cancel"
      >
        <p>Do you want to cancel this booking? </p>
      </Modal>
      <Modal
        show={confirmModal}
        size="md"
        onHide={toggleConfirmModal}
        buttonText="confirm"
      >
        <p>Confirm this bookig</p>
      </Modal>

      <Modal
        show={bookModal}
        size="md"
        onHide={toggleBookModal}
        buttonText="create"
        onclick={handleBooking}
      >
        <p className="text-lg font-medium text-sky-800">Book a Seat</p>
        <div className="px-8 pt-6 pb-8 mb-4 overflow-y-auto bg-white rounded shadow-md">
          <form className="w-full max-w-2xl">
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-location"
                >
                  Location
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-location"
                  value={values.from}
                  name="from"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select location city
                  </option>
                  {locationCities?.length < 1 ? (
                    <option value="" disabled={true}>
                      {" "}
                      No City Found
                    </option>
                  ) : (
                    locationCities?.map((cities, i) => (
                      <option key={i} value={cities._id}>
                        {cities.city}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-destination"
                >
                  destination
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-destination"
                  value={values.to}
                  name="to"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select destination state
                  </option>
                  {!destinationCities ? (
                    <option value="" disabled={true}>
                      {" "}
                      kindly choose a location city
                    </option>
                  ) : (
                    destinationCities?.map((cities, i) => (
                      <option key={i} value={cities._id}>
                        {cities.city}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-depature-date"
                >
                  depature date
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-depature-date"
                  type="date"
                  value={values.departureDate}
                  name="departureDate"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-return-date"
                >
                  Return date
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-return-date"
                  type="date"
                  value={values.returningDate}
                  name="returningDate"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-route"
                >
                  Routes
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-route"
                  value={values.route}
                  name="route"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select route
                  </option>
                  {!filterRoutes || filterRoutes?.length === 0 ? (
                    <option value={""} disabled={true}>
                      No routes available
                    </option>
                  ) : (
                    filterRoutes?.map((route, i) => {
                      const transport = transports?.find((item) => item._id == route.bus?.transporter?._id)
                      return(
                        <option key={i} value={route._id}>
                        {route.name} by {transport?.name || ''}
                      </option>
                      )
                  })
                  )}
                </select>
              </div>
              {/* <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-transport"
                >
                  Transport Company
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-transport"
                  type="text"
                  placeholder="transport company"
                  value={values.transporter}
                  name="transporter"
                  readOnly
                />
              </div> */}
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-amount"
                >
                  Amount
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-amount"
                  type="text"
                  placeholder="price"
                  value={values.amount}
                  name="amount"
                  readOnly
                />
              </div>
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-seatNo"
                >
                  Seat No
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-seatNo"
                  value={seatNumbers}
                  name="seatNumbers"
                  onChange={(e) => setSeatNumbers(e.target.value)}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select seat
                  </option>
                  {!availableSeat ? (
                    <option value={""} disabled={true}>
                      No seat available
                    </option>
                  ) : (
                    availableSeat?.map((seat, i) => (
                      <option key={i} value={seat}>
                        {seat}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-phone"
                >
                  Phone
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-phone"
                  type="tel"
                  placeholder="070238383939"
                  value={values.phone}
                  name="phone"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-email"
                >
                  Email
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-email"
                  type="email"
                  placeholder="email@email.com"
                  value={values.email}
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-passenger-name"
                >
                  Passenger Name
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-passenger-name"
                  type="text"
                  placeholder="name"
                  value={values.name}
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-gender"
                >
                  passenger gender
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-gender"
                  value={values.gender}
                  name="gender"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select gender..
                  </option>
                  <option value={"male"}>male</option>
                  <option value={"female"}>female</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-age"
                >
                  Passenger age
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  id="grid-age"
                  type="number"
                  min={0}
                  value={values.age}
                  name="age"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-trip-type"
                >
                  trip type
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-trip-type"
                  value={values.tripType}
                  name="tripType"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value={"Round Trip"}>Round Trip</option>
                  <option value={"One Way"}>One Way</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-passenger-type"
                >
                  Passenger type
                </label>
                <select
                  className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-passenger-type"
                  value={values.passengerType}
                  name="passengerType"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value={"adult"}>Adult</option>
                  <option value={"children"}>children</option>
                  <option value="infants">infants</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </Page>
  );
};

export default CustomerBooking;
