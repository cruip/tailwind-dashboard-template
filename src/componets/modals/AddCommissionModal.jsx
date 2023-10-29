import React, { useState, useEffect } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addCommission } from "../../services/commissionService";

export const AddCommissionModal = ({
  show,
  onHide,
  callBack,
  companies
}) => {
  const [values, setValues] = useState({
    amount: "",
    description: "",
    percentage: "",
    companyId: ""
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleAddCommission = () => {
    if (Object.values(values).some((o) => o === "")) {
      toast.warn("kindly make sure all fields are filled");
      return false;
    }
    setSaving(true);
    // setTimeout(() => {
    addCommission({ ...values })
      .then(async () => {
        toast.success("Commision added successfully");
        callBack();
        onHide();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setSaving(false));
    // }, 2000);
  };
 
  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="50%">
      <div className="mb-4">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="companyId"
          >
            Company
          </label>

          <select
            className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values.companyId}
            name="companyId"
            onChange={handleInputChange}
          >
            <option value="" disabled={true} hidden={true}>
              {" "}
              select Company
            </option>
            {!companies || !companies.length ? (
              <option value={""} disabled={true}>
                No companies Available
              </option>
            ) : (
              companies?.map((company, i) => (
                <option key={i} value={company?._id}>
                  {company?.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Amount
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="number"
            value={values.amount}
            onChange={handleInputChange}
            name="amount"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="percentage"
          >
            Percentage
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="percentage"
            type="number"
            value={values.percentage}
            onChange={handleInputChange}
            name="percentage"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="description"
            value={values.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleAddCommission()}
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

// export default CreateRouteModal;
