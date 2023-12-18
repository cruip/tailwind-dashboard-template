import React, { useState, useEffect, useCallback } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addBus, bulkPriceUpdate } from "../../services/busService";
import { enumToArray } from "../../utils/helper";
import { busClassEnum, busTypeEnum } from "../../utils/enum";
import DatePicker, { DateObject } from "react-multi-date-picker";

export const TripUpdatePriceModal = ({ show, onHide, callBack, routes }) => {
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState({
    // clas: "",
    type: "",
    route: "",
    price: "",
  });
  const [departureDate, setDepartureDates] = useState([]);

  const busType = enumToArray(busTypeEnum);
  // const busClass = enumToArray(busClassEnum);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleCreateTranport = () => {
    const newDepatureDate = departureDate.map((item) =>
      item.format("YYYY-MM-DD")
    );
    console.log("e enter");
    if (Object.values(values).some((o) => o === "") && !departureDate.length)
      return false;

    setSaving(true);
    console.log(values, "hhahaha");
    bulkPriceUpdate({
      ...values,
      departureDate: newDepatureDate,
    })
      .then(async () => {
        toast.success("price edited successfully");
        await callBack();
        setValues({
          type: "",
          route: "",
          price: "",
        });
        setDepartureDates([]);
        onHide();
      })
      .catch((error) => {
        console.log(error.message, "get link");
        toast.error("Oops! something went wrong");
      })
      .finally(() => setSaving(false));
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide}>
        <p>Bulk Edit Trips Prices </p>
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
                <option key={type.value} value={type.value}>
                  {type.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="date"
            >
              Depature Date
            </label>

            <DatePicker
              minDate={new DateObject().subtract(0, "days")}
              containerClassName=" w-full"
              inputClass="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              multiple
              value={departureDate}
              onChange={setDepartureDates}
            />
          </div>
          {/* <div className="mb-4">
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
                                <option key={type.value} value={type.value}>{type.text}</option>
                            ))}
                        </select>
                    </div> */}
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
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
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
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleCreateTranport()}
          >
            {saving ? "Saving..." : "Update"}
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
