import React, { useState, useEffect, useCallback } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addBus } from "../../services/busService";
import { enumToArray } from "../../utils/helper";
import { busClassEnum, busTypeEnum } from "../../utils/enum";
import DatePicker from "react-multi-date-picker";

export const AddBusModal = ({
  show,
  onHide,
  callBack,
  id,
  name,
  terminals,
  routes
}) => {
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [values, setValues] = useState({
    clas: "",
    type: "",
    route: "",
    departureTime: "",
    // departureDate: [],
    expectedArrival: "",
    numberOfSeats: "",
    availableSeats: [],
    occupiedSeat: [],
    // companyId: "",
    busImage: "",
    price: "",
    departureTerminal: "",
    arrivalTerminal: "",
    hasAC: false,
    status: false,
  });
  const [departureDate, setDepartureDates] = useState([]);

  const busType = enumToArray(busTypeEnum);
  const busClass = enumToArray(busClassEnum);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newAvailableSeat = values.availableSeats
    if(name === 'numberOfSeats'){
       newAvailableSeat = [...Array(Number(values.numberOfSeats)).keys()].map((_, i) => ((i + 1).toString()))

    }
    setValues({
      ...values,
      [name]: value,
      availableSeats: newAvailableSeat
    });
  };

  // const handleSelectSeat = (e) => {
  //   const item = values.availableSeats.find((el) => el === e.target.value);
  //   if (item) {
  //     return;
  //   }
  //   setValues({
  //     ...values,
  //     availableSeats: [...values.availableSeats, e.target.value],
  //   });
  // };

  const handleSelectSeat = useCallback(
    (e, type) => {
      if (type === "occupied") {
        if (values.occupiedSeat.includes(e.target.value)) {
          return;
        }
        const newAvailable = values.availableSeats.filter(
          (el) => el !== e.target.value
        );
        const newOccupied = [...values.occupiedSeat, e.target.value];
        setValues({
          ...values,
          occupiedSeat: newOccupied,
          availableSeats: newAvailable,
        });
      }
      if (type === "available") {
        if (values.availableSeats.includes(e.target.value)) {
          return;
        }
        const newOccupied = values.occupiedSeat.filter(
          (el) => el !== e.target.value
        );
        const newAvailable = [...values.availableSeats, e.target.value];
        setValues({
          ...values,
          occupiedSeat: newOccupied,
          availableSeats: newAvailable,
        });
      }
    },
    [values.numberOfSeats, values.availableSeats, values.occupiedSeat]
  );

  const deleteSeat = (ix) => {
    // values.seatNumbers.splice(ix, 1)
    const seatno = values.availableSeats.filter((_, i) => i !== ix);
    setValues({
      ...values,
      availableSeats: [...seatno],
    });
  };

  const uploadImage = (files) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "wni0bhqi");
    data.append("cloud_name", "dryvafrica");
    fetch("  https://api.cloudinary.com/v1_1/dryvafrica/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLogoUrl(data.url);
      });
  };

  const handleCreateTranport = () => {
    if (Object.values(values).some((o) => o === "") && !logoUrl && !departureDate.length) return false;
    setSaving(true);
    // setTimeout(() => {
    addBus({ ...values, busImage: logoUrl, companyId: id, departureDate: departureDate, status: values.status ==='true' ? true : false, hasAC: values.hasAC ==='true' ? true : false })
      .then(async () => {
        toast.success("Bus added successfully");
        await callBack();

        setLogoUrl(null);
        onHide();
      })
      .catch(() => toast.error("Oops! something went wrong"))
      .finally(() => setSaving(false))
    // }, 2000);
    
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide}>
        <p>Add Bus to {name}</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="type"
            >
              Bus type
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.type || "true"}
              onChange={handleInputChange}
              name="type"
            >
              <option value="">select type</option>
              {busType.map((type) => (
                <option value={type.value}>{type.text}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="class"
            >
              Bus class
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.clas}
              onChange={handleInputChange}
              name="clas"
            >
              <option value="">select class</option>
              {busClass.map((type) => (
                <option value={type.value}>{type.text}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="route"
            >
              Route
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.route || "true"}
              onChange={handleInputChange}
              name="route"
            >
              <option value="">select a route</option>
          {routes?.map((item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="time"
            >
              Depature Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              value={values.departureTime}
              onChange={handleInputChange}
              name="departureTime"
            />
          </div>
          <div className="mb-4 w">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="date"
            >
              Depature Date
            </label>
            {/* <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              value={values.departureDate}
              onChange={handleInputChange}
              name="departureDate"
            /> */}
            <DatePicker containerClassName=' w-full' inputClass='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' multiple value={departureDate} onChange={setDepartureDates} />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="estimated-time"
            >
              expected Arrival Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="estimated-time"
              type="text"
              value={values.expectedArrival}
              onChange={handleInputChange}
              name="expectedArrival"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="numberofseats"
            >
              number Of Seats
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="numberofseats"
              type="number"
              value={values.numberOfSeats}
              onChange={handleInputChange}
              name="numberOfSeats"
            />
          </div>
          {/* <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="availableseat"
            >
              Available Seat
            </label>

            <select
              className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="availableseat"
              value=""
              name="availableSeats"
              onChange={(e) => {
                handleSelectSeat(e, "available");
                // handlePrice(e.target.value)
              }}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select Avalable seats
              </option>
              {!values.numberOfSeats || !values.numberOfSeats.length ? (
                <option value={""} disabled={true}>
                  No Seat Available
                </option>
              ) : (
                // renderSeats([...Array(Number(values.numberOfSeats)).keys()])
                [...Array(Number(values.numberOfSeats)).keys()].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))
              )}
            </select>
            {values.availableSeats.length
              ? values.availableSeats.map((item, i) => (
                  <span
                    onClick={() => deleteSeat(i)}
                    className="px-2 mr-1 text-sm text-white bg-blue-500 rounded-md cursor-pointer"
                    key={i}
                  >
                    {item}
                  </span>
                ))
              : ""}
          </div> */}
          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="occupiedseat"
            >
              occupied Seat
            </label>

            <select
              className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="occupiedseat"
              value=""
              name="occupiedSeat"
              onChange={(e) => {
                handleSelectSeat(e, "occupied");
                // handlePrice(e.target.value)
              }}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select occupied seats
              </option>
              {!values.numberOfSeats || !values.numberOfSeats.length ? (
                <option value={""} disabled={true}>
                  No Seat Occupied
                </option>
              ) : (
                [...Array(Number(values.numberOfSeats)).keys()].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))
              )}
            </select>
            {values.occupiedSeat.length
              ? values.occupiedSeat.map((item, i) => (
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

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="logo"
            >
              Bus Image
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="logo"
              type="file"
              placeholder="paste logo url"
              onChange={(e) => uploadImage(e.target.files)}
              name="logo"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              placeholder="20000"
              value={values.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="arrivalTerminal"
            >
              Select Arrival Terminals
            </label>

            <select
              className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.arrivalTerminal}
              name="arrivalTerminal"
              onChange={handleInputChange}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select terminal
              </option>
              {!terminals || !terminals.length ? (
                <option value={""} disabled={true}>
                  No Terminal Available
                </option>
              ) : (
                terminals?.map((terminal, i) => (
                  <option key={i} value={terminal?._id}>
                    {terminal?.city} {terminal?.locationCode}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="departureTerminal"
            >
              Select Depature Terminals
            </label>

            <select
              className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.departureTerminal}
              name="departureTerminal"
              onChange={handleInputChange}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select terminal
              </option>
              {!terminals || !terminals.length ? (
                <option value={""} disabled={true}>
                  No Terminal Available
                </option>
              ) : (
                terminals?.map((terminal, i) => (
                  <option key={i} value={terminal?._id}>
                    {terminal?.city} {terminal?.locationCode}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="hasac"
            >
              Has AC
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.hasAC}
              onChange={handleInputChange}
              name="hasAC"
            >
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="status"
            >
              company status
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.status}
              onChange={handleInputChange}
              name="status"
            >
               <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleCreateTranport()}
          >
            {saving ? "Saving..." : "Add"}
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
