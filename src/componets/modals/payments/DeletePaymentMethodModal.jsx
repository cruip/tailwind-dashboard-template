import React, { useState } from "react";
import { DeleteModal } from "../common/DeleteModal";
import { deletePaymentMethod } from "../../../services/Payment";
import { toast } from "react-toastify";

export const DeletePaymentMethodModal = ({
  show,
  onHide,
  callBack,
  paymentMethodId,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodDelete = async () => {
    setLoading(true);
    deletePaymentMethod({paymentMethodId})
      .then(async () => {
        toast.success("payment method deleted successfully");
        await callBack();
        onHide();
      })
      .catch(() => toast.error("could not delete payment method"));
    setLoading(false);
  };
  return (
    <DeleteModal
      titleMessage="Do you want to delete this payment method ?"
      show={show}
      onHide={onHide}
      disabled={loading}
      buttonText={loading ? "processing" : "Confirm"}
      handleOnclick={handlePaymentMethodDelete}
    />
  );
};
