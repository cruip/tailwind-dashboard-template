import React, { useState } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addBusToRoute } from "../../services/busService";

export const AddBusRouteModal = ({ show, onHide, id, name, buses }) => {
  const [saving, setSaving] = useState(false);
  const [busId, setBusId] = useState("");

  const asignBusToRoute = (id) => {
    setSaving(!saving);
    addBusToRoute({
      busId,
      routeId: id,
    })
      .then((r) => {
        toast.success("Bus Added successfully to Route");
        // await callBack();
        onHide();
      })
      .catch(() => toast.error("Oops! something went wrong"));
    setSaving(!saving);
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
       <div className="mx-2 mb-8">
       <p className="mb-5 font-semibold text-blue-700">Add Bus  to Route {name}</p>
        <select
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          name="routeId"
        >
          <option value="">select a route</option>
          {buses?.map((item) => (
            <option key={item._id} value={item._id}>{item?.vehicleNo} {item?.vehicleBrand}</option>
          ))}
        </select>
       </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => asignBusToRoute(id)}
          >
            {saving ? "Submiting..." : "Add Route"}
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
