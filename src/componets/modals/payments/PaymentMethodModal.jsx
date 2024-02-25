import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../partials/modal/Modal";
import { addPaymentMethod } from "../../../services/Payment";

export const PaymentMethodModal = ({ show, onHide, callBack }) => {
  const [values, setValues] = useState({
    name: "",
    canRefund: false,
    isEnabled: false,
  });
  const actionStatus = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  //   const OptionSelected = Object.values(values).some(Boolean);
  const { name, isEnabled, canRefund } = values;
  const OptionSelected = !name && !isEnabled && !canRefund;
  
    const handleAddPaymentMethod = () => {
      setSaving(true);
      addPaymentMethod({ ...values })
        .then(async () => {
          toast.success("Payment Method added successfully");
          callBack();
          onHide();
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setSaving(false));
    };
  return (
    <Fragment>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
        <div className="my-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Payment Method Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={values["name"]}
            onChange={handleInputChange}
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="canRefund"
          >
            Is refund allowed ?
          </label>
          <select
            className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values["canRefund"]}
            onChange={handleInputChange}
            name="canRefund"
          >
            {/* <option value="">select status</option> */}
            {actionStatus?.map((item, index) => (
              <option key={index} value={item?.value}>
                {item?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="isEnabled"
          >
            Enable now ?
          </label>
          <select
            className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values["isEnabled"]}
            onChange={handleInputChange}
            name="isEnabled"
          >
            {/* <option value="">select status</option> */}
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
              OptionSelected ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handleAddPaymentMethod()}
            disabled={OptionSelected}
          >
            {saving ? "Confirming" : "Confirm"}
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};
