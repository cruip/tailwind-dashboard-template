import React, { useState } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
// import { createRoute } from "../../services/routeService";
import { createTerminal } from "../../services/locationService";

export const CreateTerminalModal = ({ show, onHide, callBack }) => {
  const [values, setValues] = useState({
    locationName: "",
    locationCode: "",
    address: "",
    city: "",
    cityCode: "",
    stateCode: "",
    longitude: "1",
    latitude: "1",
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCreateTerminal = () => {
    if (Object.values(values).some((o) => o === "")) return false;
    setSaving(true);
        createTerminal({ ...values, streetAddress: values.address })
      .then(async () => {
        toast.success("terminal created successfully");
       await callBack()
        onHide();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops! something went wrong")
      })
      .finally(() => setSaving(false));
  };
  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="50%">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="locationName"
          >
            Loaction Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="locationName"
            type="text"
            value={values.locationName}
            onChange={handleInputChange}
            name="locationName"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="locationCode"
          >
            location Code
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="locationCode"
            type="text"
            value={values.locationCode}
            onChange={handleInputChange}
            name="locationCode"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="address"
          >
            address
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            value={values.address}
            onChange={handleInputChange}
            name="address"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="city"
          >
            city
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            value={values.city}
            onChange={handleInputChange}
            name="city"
          />
        </div>
        {/* <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="streetAddress"
          >
            street Address
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="streetAddress"
            type="text"
            value={values.streetAddress}
            onChange={handleInputChange}
            name="streetAddress"
          />
        </div> */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="cityCode"
          >
            city Code
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="cityCode"
            type="text"
            value={values.cityCode}
            onChange={handleInputChange}
            name="cityCode"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="stateCode"
          >
            stateCode
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="stateCode"
            type="text"
            value={values.stateCode}
            onChange={handleInputChange}
            name="stateCode"
          />
        </div>

        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleCreateTerminal()}
          >
            {saving ? "Saving..." : "Create"}
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

// export default CreateRouteModal;
