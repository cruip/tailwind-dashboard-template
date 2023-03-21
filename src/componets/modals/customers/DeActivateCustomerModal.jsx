import React, { useState } from "react";
import Modal from "../../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { ActivateDeactivateTransport } from "../../../services/transporterService";

export const DeActivateCustomerModal = ({ show, onHide, id, callBack }) => {
  const [saving,  setSaving] = useState(false)
  const handlActivationCustomer = (id, status) => {
    setSaving(!saving)
    // ActivateDeactivateTransport({
    //   transporterId: id,
    //   status: status,
    // })
    //   .then(async (r) => {
    //     toast.success("Transport status updated successfully");
    //     await callBack();
    //     onHide();
    //   })
    //   .catch(() => toast.error("Oops! something went wrong"));
      setSaving(!saving)
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
        <p>De-activate this Customer</p>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handlActivationCustomer(id, "true")}
          >
           {saving ? 'Submiting...' : ' De-Activate'}
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
