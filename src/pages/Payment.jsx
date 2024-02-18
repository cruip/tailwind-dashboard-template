import { useEffect, useState } from "react";
import DropDown from "../partials/DropDown";
import Page from "../partials/page";
import { Card } from "../partials/card/Card";
import { Table } from "../partials/table";
import { getPaymentById, getPaymentsHistory } from "../services/Payment";
import { formattedAmountWithNaira } from "../utils/helper";
import { ApprovePaymentModal } from "../componets/modals/payments/ApprovePaymentModal";
import { SVGIcon } from "../partials/icons/SvgIcon";

export const Payment = () => {
  const tableHeader = [
    "Payment ID",
    "Amount",
    "Booking Number",
    "Email",
    "Account Number",
    "Bank Name",
    "Status",
    "Action",
  ];
  // states
  const size = 10;
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [approvePaymentModal, setApprovePaymentModal] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //   function

  const getPaymentHistory = async (page, size) => {
    try {
      const { data, loading, errors } = await getPaymentsHistory(page, size);
      console.log(data);
      setLimit(data?.getPayments?.nodes?.length);
      setPaymentRecords(data?.getPayments?.nodes);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoad(false);
    }
  };

  const onFilter = async () => {
    // if (!searchQuery) getPaymentsHistory(10, currentPage);
    if (searchQuery) {
      const { data } = await getPaymentById(searchQuery);
      //   console.log(data);
      setLimit(data?.getPayments?.nodes?.length);
      setPaymentRecords(data?.getPayments?.nodes);
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
    getPaymentHistory(currentPage, size);
  }, [currentPage]);

  useEffect(() => {
    onFilter();
  }, [searchQuery]);

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>{data?._id}</td>
        <td>{formattedAmountWithNaira(data?.amount)}</td>
        <td>{data?.bookingNo}</td>
        <td>{data?.paymentMetaData?.email}</td>
        <td>{data?.paymentMetaData?.accountNumber}</td>
        <td>{data?.paymentMetaData?.bankName}</td>
        <td>{data?.status}</td>
        <td>
          <DropDown
            links={[
              {
                name: "Update payment status",
                isLink: false,
                onclick: () => {
                  setApprovePaymentModal(!approvePaymentModal);
                  setPaymentId(data?._id);
                },
                link: "",
                icon: "edit",
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
          <h4>Payment </h4>
          {/* <button
            className="px-4 py-2 text-white transition-shadow rounded-md shadow-md hover:shadow-lg w-52 bg-sky-800"
            onClick={toggleAddCommissionModal}
          >
            Add Commission
          </button> */}
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Payment History"} width="w-full">
            <div className="items-center justify-between w-full mt-4 md:flex">
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-5"
                  >
                    <SVGIcon name="search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 ">
              <Table
                data={paymentRecords}
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
      <ApprovePaymentModal
        show={approvePaymentModal}
        size="md"
        onHide={() => setApprovePaymentModal(!approvePaymentModal)}
        paymentId={paymentId}
        callBack={getPaymentHistory}
      />
      {/* <UpdateCommissionModal
        show={updateCommissionModal}
        size="md"
        onHide={toggleUpdateCommissionModal}
        data={Singledatas}
        commissionId={commissionId}
        companyId={companyId}
        callBack={fecthCommissions}
      ></UpdateCommissionModal> */}
    </Page>
  );
};
