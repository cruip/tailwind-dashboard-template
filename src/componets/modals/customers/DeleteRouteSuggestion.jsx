import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DeleteModal } from "../common/DeleteModal";
import { deleteCustomerRouteRequest } from "../../../services/bookingsService";

export const DeleteRouteSuggestion = ({
  show,
  onHide,
  callBack,
  requestId,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRouteRequestDelete = async () => {
    setLoading(true);
    deleteCustomerRouteRequest({ requestId })
      .then(async (data) => {
        if (data?.data?.deleteRouteRequest) {
          toast.success("Record deleted successfully");
          await callBack();
          onHide();
        }
      })
      .catch(() => toast.error("could not delete this record"))
      .finally(() => setLoading(false));
  };
  return (
    <Fragment>
      <ToastContainer />
      <DeleteModal
        titleMessage="Do you want to delete this record ?"
        show={show}
        onHide={onHide}
        disabled={loading}
        buttonText={loading ? "processing" : "Confirm"}
        handleOnclick={handleRouteRequestDelete}
      />
    </Fragment>
  );
};
