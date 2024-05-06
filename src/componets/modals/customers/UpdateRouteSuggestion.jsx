import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../partials/modal/Modal";
import { actionStatus } from "../../../utils/enum";
import { updateCustomerRouteRequest } from "../../../services/bookingsService";

export const UpdateRouteSuggestion = ({
  show,
  onHide,
  requestId,
  callBack,
}) => {
  const [saving, setSaving] = useState(false);
  const [attendedTo, setAttendedTo] = useState("");
  const handleUpdateRouteSuggestion = async () => {
    setSaving(true);
    const variables = {
      requestId: requestId,
      attendedTo: attendedTo === "true" ? true : false,
    };
    updateCustomerRouteRequest(variables)
      .then(async (r) => {
        toast.success("Record modified");
        setAttendedTo("");
        await callBack();
        onHide();
      })
      .catch(() => {
        toast.error("Oops! something went wrong");
      })
      .finally(() => setSaving(false));
  };
  return (
    <Fragment>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="canRefund"
          >
            Has this been attended to?
          </label>
          <select
            className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={attendedTo}
            onChange={(e) => setAttendedTo(e.target.value)}
            name="attendedTo"
          >
            <option disabled value="">
              {" "}
              -- select an option --{" "}
            </option>
            {actionStatus?.map((item, index) => (
              <option key={index} value={item?.value}>
                {item?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between  py-5  sm:flex-row-reverse">
          <button
            type="button"
            className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
              !attendedTo ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handleUpdateRouteSuggestion()}
            disabled={!attendedTo || saving}
          >
            {saving ? "Confirming" : "Confirm"}
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};
