import React, { useState, useEffect, useCallback } from "react";
import Modal from "../../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { createBooking, getAllTrips } from "../../../services/bookingsService";
import { statusEnum } from "../../../utils/enum";
import { enumToArray } from "../../../utils/helper";

import moment from "moment";
import Select from "react-select";

export const BookSeatModal = ({ show, onHide, id, callBack, location }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.authenticate?.user?._id;
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const [saving, setSaving] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  // const [roundTrip, setRoundTrip] = useState(false);
  const [buses, setBuses] = useState(null);
  const [seats, setSeats] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [values, setValues] = useState({
    from: "",
    to: "",
    departureDate: "",
    returningDate: "",
    busId: "",
    transporter: "",
    phone: "",
    email: "",
    seatNumbers: [],
    tripType: "One Way",
    passengerType: "adult",
    amount: 1,
    status: "pending",
  });
  const [passengerss, setPassengerss] = useState([
    {
      lastName: "",
      firstName: "",
      age: "",
      gender: "",
    },
  ]);
  const [totalPrice, setTotalPrice] = useState("");
  const Bookstat = enumToArray(statusEnum);

  // const toggleRound = () => setRoundTrip((value) => !value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if(name === 'from'){
    //   if(value === values.to) {
    //     return
    //   }
    // }
    // if(name === 'to'){
    //   if(value === values.from) {
    //     return
    //   }
    // }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const addPassenger = () => {
    setPassengerss([
      ...passengerss,
      {
        lastName: "",
        firstName: "",
        age: "",
        gender: "",
      },
    ]);
  };

  const removePassenger = (index) => {
    const newPassengers = passengerss.filter((_, i) => i !== index);
    setPassengerss(newPassengers);
  };

  const handleSelectSeat = (e) => {
    const item = values.seatNumbers.find((el) => el === e.target.value);
    if (item) {
      return;
    }
    setValues({
      ...values,
      seatNumbers: [...values.seatNumbers, Number(e.target.value)],
    });
  };

  const deleteSeat = (ix) => {
    // values.seatNumbers.splice(ix, 1)
    const seatno = values.seatNumbers.filter((_, i) => i !== ix);
    setValues({
      ...values,
      seatNumbers: [...seatno],
    });
  };

  const handlePassengerInput = (index, event) => {
    const { name, value } = event.target;
    const passenger = passengerss;
    passenger[index][name] = value;
    setPassengerss([...passenger]);
  };

  const handleBooking = () => {
    if (Object.values(values).some((o) => o === "") && !passengerss) {
      toast.warn("kindly fill all fields");
      return false;
    }

    if (values.seatNumbers.length !== passengerss.length) {
      toast.warn("seat selected is not same as number of passengers");
      return;
    }
    createBooking({
      ...values,
      passengers: [...passengerss],
      bookingDate: date,
      user: userId,
    })
      .then(async () => {
        toast.success("seat booked successfully");
        setValues({
          from: "",
          to: "",
          departureDate: "",
          returningDate: "",
          busId: "",
          transporter: "",
          phone: "",
          email: "",
          seatNumbers: [],
          tripType: "Round Trip",
          passengerType: "adult",
          amount: 1,
          status: "true",
          // bookingDate: date,
        });
        setPassengerss([
          {
            lastName: "",
            firstName: "",
            age: "",
            gender: "",
          },
        ]);
        await callBack();
      })
      .catch(() => toast.error("Oops! something went wrong"))
      .finally(() => onHide());
  };

  const getTrips = async (filters) => {
   try {
    setIsRouting(true);
    // moment(values.departureDate).format(" MMM Do, YYYY | h:mm a")
    const { data } = await getAllTrips({
      page: 1,
      size: 10000,
      filters: { ...filters },
    });
    console.log(data.getTrips?.nodes, "trips");
    setRoutes(data.getTrips.nodes);
    const busesArray = [];
    data.getTrips?.nodes?.forEach((el) => {
      // if(item.buses || item.buses?.length){
      // item.forEach((el) => {
      busesArray.push({
        _id: el._id,
        type: el.type,
        class: el.class,
        transporter: el.companyId.name,
        price: el.price || "10000",
        availableSeats: el.availableSeats?.map((item) => Number(item)),
        transporterId: el?.companyId?._id,
        depatureTime: el.departureTime,
      });
      // })
      // }
    });
    setBuses(busesArray);
  } catch (error) {
    console.log(error);
  }finally {
    
    setIsRouting(false);
   }
  };
  // const handlePrice = useCallback((id) => {
  //   const bus = buses?.find((item) => item._id === id)
  //   console.log(bus, buses, 'callback', id);
  //   // setValues({
  //   //   ...values,
  //   //   amount: Number(bus?.price) * (values.seatNumbers.length ? values.seatNumbers.length : 1)
  //   // })
  // },
  //   //  setValues(
  //   //     {...values, amount: values.amount * 100}
  //   //  )

  //   [values.seatNumbers, values.route]
  // );

  useEffect(() => {
    if (values.from && values.to && values.departureDate) {
      if (values.from === values.to) {
        return;
      }
      getTrips({
        to: values?.to,
        from: values?.from,
        date: values.departureDate,
      });
    }
  }, [values.from, values.to, values.departureDate]);

  useEffect(() => {
    const bus = buses?.find((item) => item._id === values.busId);
    setSeats(bus?.availableSeats);
    // setSeats(bus?.availableSeats)
    setValues({
      ...values,
      transporter: bus?.transporterId,
      amount: (
        Number(bus?.price || 0) *
        (values.seatNumbers.length ? values.seatNumbers.length : 1)
      ).toString(),
    });
  }, [values.busId, values.seatNumbers]);

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="60%">
        <p className="text-lg font-medium text-sky-800">Book a Seat</p>
        <div className="px-8 pt-6 pb-8 mb-4 overflow-y-auto bg-white rounded shadow-md">
          <form className="w-full max-w-2xl">
            {/* <div className="flex items-center w-full px-3 mb-6">
              <label
                className="block mr-3 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="isround"
              >
                Round Trip
              </label>
              <input
                id="isround"
                type="checkbox"
                checked={roundTrip}
                onChange={toggleRound}
              />
            </div> */}
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
                  {location?.length < 1 ? (
                    <option value="" disabled={true}>
                      {" "}
                      No City Found
                    </option>
                  ) : (
                    location?.map((cities, i) => (
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
                  {location?.length < 1 ? (
                    <option value="" disabled={true}>
                      {" "}
                      No City Found
                    </option>
                  ) : (
                    location?.map((cities, i) => (
                      <option key={i} value={cities._id}>
                        {cities.city}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap mb-0 -mx-3">
              <div className={`className="w-full px-3 mb-6 md:w-1/2 md:mb-0"`}>
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
                  min={today}
                  name="departureDate"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="bookstat"
                >
                  Booking status
                </label>
                <select
                  className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                  value={values.status}
                  onChange={handleInputChange}
                  name="status"
                >
                  <option value="">select booking stat code</option>
                  {Bookstat.map((type) => (
                    <option value={type.text}>{type.value}</option>
                  ))}
                </select>
              </div>
              {/* {
                roundTrip && (
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
                  min={today}
                  name="returningDate"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
                )
              } */}
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
                  value={values.busId}
                  name="busId"
                  onChange={(e) => {
                    handleInputChange(e);
                    // handlePrice(e.target.value)
                  }}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select Bus
                  </option>
                  {isRouting ? (
                    <option value={""} disabled={true}>
                      Loading...
                    </option>
                  ) : !isRouting && (!buses || !buses.length) ? (
                    <option value={""} disabled={true}>
                      No Bus for the locations and date choosen
                    </option>
                  ) : (
                    buses?.map((bus, i) => (
                      <option key={bus._id} value={bus._id}>
                        {bus.type} {bus.class} By {bus.transporter} leaving{" "}
                        {bus.depatureTime}
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
                  htmlFor="grid-amount"
                >
                  Amount per seat
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
                  id="grid-route"
                  value=""
                  name="seats"
                  onChange={(e) => {
                    handleSelectSeat(e);
                    // handlePrice(e.target.value)
                  }}
                >
                  <option value="" disabled={true} hidden={true}>
                    {" "}
                    select Seat
                  </option>
                  {!seats || !seats.length ? (
                    <option value={""} disabled={true}>
                      No Seat Available
                    </option>
                  ) : (
                    seats?.map((seat, i) => (
                      <option key={i} value={seat}>
                        {seat}
                      </option>
                    ))
                  )}
                </select>
                {values.seatNumbers.length
                  ? values.seatNumbers.map((item, i) => (
                      <span
                        onClick={() => deleteSeat(i)}
                        className="px-2 mr-1 text-sm text-white bg-blue-500 rounded-md cursor-pointer"
                        key={i}
                      >
                        {item}
                      </span>
                    ))
                  : ""}
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
              {/* <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
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
              </div> */}
            </div>
            {passengerss.map((item, i) => (
              <div
                className="flex flex-wrap pt-4 mb-6 -mx-3 border-t-2 border-slate-300"
                key={i}
              >
                {i > 0 && (
                  <div className="flex justify-end w-full">
                    <span
                      className="px-1 text-red-500 bg-red-200 rounded cursor-pointer"
                      onClick={() => removePassenger(i)}
                    >
                      remove
                    </span>
                  </div>
                )}
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-passenger-fname"
                  >
                    Passenger First Name
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                    id="grid-passenger-fname"
                    type="text"
                    placeholder="firstName"
                    value={item.firstName}
                    name="firstName"
                    onChange={(e) => handlePassengerInput(i, e)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-passenger-name"
                  >
                    Passenger Last Name
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                    id="grid-passenger-name"
                    type="text"
                    placeholder="lastName"
                    value={item.lastName}
                    name="lastName"
                    onChange={(e) => handlePassengerInput(i, e)}
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
                    value={item.gender}
                    name="gender"
                    onChange={(e) => handlePassengerInput(i, e)}
                  >
                    <option value="" disabled={true} hidden={true}>
                      {" "}
                      select gender..
                    </option>
                    <option value={"male"}>male</option>
                    <option value={"female"}>female</option>
                  </select>
                </div>
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
                    value={item.age}
                    name="age"
                    onChange={(e) => handlePassengerInput(i, e)}
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between ">
              <p>add another passenger</p>
              <span
                className="px-2 py-1 text-black border-2 rounded-lg cursor-pointer border-slate-300 bg-slate-50 focus:outline-none"
                onClick={() => addPassenger()}
              >
                add
              </span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span>Total Amount</span>
              <span className="text-xl font-semibold text-emerald-600">
                N{values.amount || "0.00"}
              </span>
            </div>
          </form>
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleBooking()}
          >
            {saving ? "Booking..." : " Book"}
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onHide}
          >
            close
          </button>
        </div>
      </Modal>
    </>
  );
};
