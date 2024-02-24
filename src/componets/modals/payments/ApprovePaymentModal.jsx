import { Fragment, useState } from "react";
import Modal from "../../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { approveManualPayment } from "../../../services/Payment";

export const ApprovePaymentModal = ({
  show,
  onHide,
  paymentId,
  status,
  callBack,
}) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const handlePaymentApproval = () => {
    setSaving(true);
    approveManualPayment({
      paymentId: paymentId,
      status: paymentStatus,
    })
      .then(async (r) => {
        toast.success("Payment Confirmed");
        setPaymentStatus("");
        await callBack();
        onHide();
      })
      .catch(() => toast.error("Oops! something went wrong"))
      .finally(() => setSaving(false));
  };
  const paymentStatusEnum = [
    "completed",
    "canceled",
    "error",
    "refunded",
  ];
  return (
    <Fragment>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
        <div className="mt-8">
          <p className="mb-8">select payment status</p>
          <select
            className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            name="paymentStatus"
          >
            {/* <option value="">select status</option> */}
            {paymentStatusEnum?.map((item, index) => (
              <option key={index} value={item}>
                {item.toLocaleUpperCase()}
              </option>
            ))}
          </select>
          <div className="flex justify-between  py-5  sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handlePaymentApproval()}
            >
              {saving ? "Confirming" : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
