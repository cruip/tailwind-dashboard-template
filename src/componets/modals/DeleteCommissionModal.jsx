import React, { useState } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { deleteCommission } from "../../services/commissionService";

export const DeleteCommissionModal = ({ show, onHide, id, callBack }) => {
  const [saving,  setSaving] = useState(false)

  const handleDelete = async (id) => {
    setSaving(!saving);
    deleteCommission(id)
      .then(async() => {
        toast.success("Route deleted successfully");
          await callBack();
          onHide()
      })
      .catch(() => toast.error("could not delete Route"))
      .finally(() => setSaving(!saving));
      
  };

  return (
   <>
    <ToastContainer />
    <Modal show={show} size="md" onHide={onHide} width='30%'>
    <p className="mt-4 text-center ">Do you want to Delete this Commission? </p>
      <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => handleDelete(id)}
        >
          {saving ? 'Submiting...' : 'Delete'} 
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

