import React, { useEffect, useState } from "react";
import { Table } from "../partials/table";
import Page from "../partials/page";
import { Card } from "../partials/card/Card";
import DropDown from "../partials/DropDown";
import { getPaymentMethods } from "../services/Payment";
import { PaymentMethodModal } from "../componets/modals/payments/PaymentMethodModal";
import { DeletePaymentMethodModal } from "../componets/modals/payments/DeletePaymentMethodModal";

export const PaymentMethods = () => {
  const tableHeader = [
    "Payment Method",
    "Is it enabled",
    "Can refund",
    "Action",
  ];
  // states
  const size = 10;
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  //   function

  const handleGetPaymentMethods = async (page, size) => {
    try {
      const { data, loading, errors } = await getPaymentMethods(page, size);
      setLimit(data?.getPaymentMethods?.nodes?.length);
      setPaymentMethods(data?.getPaymentMethods?.nodes);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoad(false);
    }
  };

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  //   side-effects
  useEffect(() => {
    handleGetPaymentMethods(currentPage, size);
  }, [currentPage]);

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>{data?.name?.toUpperCase()}</td>
        <td>{data?.isEnabled ? "Yes" : "No"}</td>
        <td>{data?.canRefund ? "Yes" : "No"}</td>
        <td>
          <DropDown
            links={[
              {
                name: "Edit Payment Method",
                isLink: false,
                // onclick: () => {
                 
                // },
                link: "",
                icon: "edit",
              },
              {
                name: "Delete Payment Method",
                isLink: false,
                onclick: () => {
                  setShowDeletePaymentModal(true);
                  setPaymentMethodId(data?._id);
                },
                link: "",
              },
            ]}
          />
        </td>
      </tr>
    );
  };
  return (
    <Page>
      <section>
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> */}

        <div className="flex items-center justify-between mb-6">
          <h4>Payment Methods </h4>
          <button
            className="px-4 py-2 text-white transition-shadow rounded-md shadow-md hover:shadow-lg w-52 bg-sky-800"
            onClick={() => setShowPaymentModal(!showPaymentModal)}
          >
            Add Payment Method
          </button>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={""} width="w-full">
            {/* <div className="items-center justify-between w-full mt-4 md:flex">
            <div className="flex items-center">
              <label html="search" className="sr-only">
                Search by Payment Id
              </label>
              <div className="relative w-full mt-2 md:mt-0">
                <input
                  type="text"
                  id="search"
                  className="ml-1 md:ml-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by Payment Id"
                  required
                //   onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-5"
                >
                  <SVGIcon name="search" />
                </button>
              </div>
            </div>
          </div> */}
            <div className="mt-10 ">
              <Table
                data={paymentMethods}
                onNext={onNextPage}
                onPrev={onPrevPage}
                currentPage={currentPage}
                totalPages={totalPages}
                emptyMessage="No Data"
                loadingText="Loading Data..."
                loading={tableLoad}
                rowFormat={tableRow}
                headers={tableHeader}
                paginated={true}
              />
            </div>
          </Card>
        </div>
      </section>
      <PaymentMethodModal
        show={showPaymentModal}
        size="md"
        onHide={() => setShowPaymentModal(!showPaymentModal)}
        callBack={handleGetPaymentMethods}
      />
      <DeletePaymentMethodModal
        show={showDeletePaymentModal}
        onHide={() => setShowDeletePaymentModal(false)}
        callBack={handleGetPaymentMethods}
        paymentMethodId={paymentMethodId}
      />
    </Page>
  );
};
