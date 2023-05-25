import React from "react";
import { Card } from "../partials/card/Card";
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Link } from "react-router-dom";
import Modal from "../partials/modal/Modal";

const CustomerBookingDetail = () => {
  const [cancelModal, setCancelModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [reschedulemModal, setRescheduleModal] = React.useState(false);
  const [changeStatusModal, setChangeStatusModal] = React.useState(false);
  const [invoiceModal, setInvoiceModal] = React.useState(false);

  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
  };

  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const toggleInvoiceModal = () => {
    setInvoiceModal(!invoiceModal);
  };

  const toggleRescheduleModal = () => {
    setRescheduleModal(!reschedulemModal);
  };

  const toggleStatusModal = () => {
    setChangeStatusModal(!changeStatusModal);
  };

  return (
    <Page>
      <div>
        <Link to={"/booking"}>
          <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to Victors Booking Page
      </h2>
      <div className="w-full mx-auto mt-8 xl:w-4/5">
        <Card width="w-full">
          <Tabs defaultTab={0}>
            <Tab label="Profile" tabIndex={0} />
            <Tab label="Travel history" tabIndex={1} />
            <div className="mt-4 ">
              <TabPane tabIndex={0}>
                <div className="mt-5 ">
                  <h2 className="mb-4 text-xl font-semibold text-slate-800">
                    Customer name: Victor Chukwu
                  </h2>
                  <h3 className="mb-2 text-lg text-slate-600">
                    email: okenwa1993@gmail.com
                  </h3>
                  <h3 className="mb-2 text-lg text-slate-600">
                    Adress: Okestina close enugu
                  </h3>
                  <h3 className="mb-2 text-lg text-slate-600">
                    Phone: 07023880693
                  </h3>
                </div>
                <div className="flex flex-wrap items-center mt-6">
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={toggleInvoiceModal}
                  >
                    View Invoice
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => toggleCancelModal()}
                  >
                    Cancel Booking
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={toggleRescheduleModal}
                  >
                    Reschedule Booking
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={toggleConfirmModal}
                  >
                    Confirm Booking
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={toggleStatusModal}
                  >
                    Change Pasenger's status
                  </button>
                </div>
              </TabPane>
              <TabPane tabIndex={1}>
                <div className="mt-5 ">
                  <h2 className="mb-4 text-xl font-semibold text-slate-800">
                    List of customer transport History
                  </h2>
                </div>
              </TabPane>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* //modals */}

      <Modal
        show={cancelModal}
        size="md"
        onHide={toggleCancelModal}
        buttonText="Cancel"
      >
        <p>Do you want to cancel this booking? </p>
      </Modal>

      <Modal
        show={invoiceModal}
        size="md"
        onHide={toggleInvoiceModal}
        buttonText="download"
      >
        <p>download invoice as pdf</p>
      </Modal>
      <Modal
        show={confirmModal}
        size="md"
        onHide={toggleConfirmModal}
        buttonText="confirm"
      >
        <p>Confirm this bookig</p>
      </Modal>
      <Modal
        show={reschedulemModal}
        size="md"
        onHide={toggleRescheduleModal}
        buttonText="reschedule"
      >
        <p>Do you want to reschedule the trip?</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="date"
            >
              select new travel date
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Username"
            />
          </div>
        </div>
      </Modal>
      <Modal
        show={changeStatusModal}
        size="md"
        onHide={toggleStatusModal}
        buttonText="chnage"
      >
        <p>Do you want to change the status of this trip?</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="relative inline-block w-full">
            <select className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline">
              <option>
                cancelled
              </option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default CustomerBookingDetail;