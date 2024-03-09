import React, { useState } from "react";
import Modal from "../../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { toggleBookingStatus } from "../../../services/bookingsService";
// import { cancelConfirmBooking } from "../../../services/bookingsService";

export const ToggleStatusModal = ({ show, onHide, id, callBack, status }) => {
  const [saving, setSaving] = useState(false);
  const [reason, setReason] = useState("");
  const handlBookingStatus = () => {
    setSaving(true);
    toggleBookingStatus({
      bookingId: id,
      status: status,
      ...(reason && { cancellationReason: reason }),
    })
      .then(async (r) => {
        toast.success(
          `${
            status == "cancelled"
              ? "Booking cancelled succesfully"
              : "Booking Confirmed"
          }`
        );
        // setId("");
        await callBack();
        onHide();
      })
      .catch(() => toast.error("Oops! something went wrong"))
      .finally(() => setSaving(false));
  };
  const disabledButton = status == "cancelled" && !reason;

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
        <p>
          {" "}
          Do you want to {status === "cancelled" ? "Cancel" : "Confirm"} this
          booking?
        </p>
        {status == "cancelled" && (
          <div className="mt-8">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Enter reason for cancellation..."
            ></textarea>
          </div>
        )}
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            disabled={disabledButton}
            className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
              disabledButton ? "cursor-not-allowed" : ""
            }`}
            // className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handlBookingStatus()}
          >
            {saving ? "Submiting..." : "Submit"}
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
