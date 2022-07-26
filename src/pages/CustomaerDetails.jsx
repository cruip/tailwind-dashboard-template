import React, { useState } from "react";
import { Card } from "../partials/card/Card";
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Link } from "react-router-dom";
import Modal from "../partials/modal/Modal";

const Customer = () => {
    const [deactivateModal, setDeactivateModal] = useState(false);
    const [activateModal, setActivateModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false)

    const toggleDeactivateModal = () => {
        setDeactivateModal(!deactivateModal);
      };
    
      const toggleActivateModal = () => {
        setActivateModal(!activateModal);
      };

      const toggleEmailModal = () => {
        setEmailModal(!emailModal)
      }

      const togglePasswordModal = () => {
        setPasswordModal(!passwordModal)
      }

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
        Welcome to Victors Profile
      </h2>
      <div className="w-full mx-auto mt-8 xl:w-4/5">
        <Card width="w-full">
          <Tabs defaultTab={0}>
            <Tab label="Profile" tabIndex={0} />
            <Tab label="Booking Details" tabIndex={1} />
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
                    onClick={toggleDeactivateModal}
                  >
                   Deactivate Account
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => toggleActivateModal()}
                  >
                   Re Activate Account
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => toggleEmailModal()}
                  >
                   Change Email
                  </button>
                  <button
                    className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
                    onClick={() => togglePasswordModal()}
                  >
                   Change Password
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
        show={deactivateModal}
        size="md"
        onHide={toggleDeactivateModal}
        buttonText="De-Activate"
      >
        <p>Do you want to Deactivate this account? </p>
      </Modal>
      <Modal
        show={activateModal}
        size="md"
        onHide={toggleActivateModal}
        buttonText="Activate"
      >
        <p>Reactivate this Customer</p>
      </Modal>
      <Modal
        show={emailModal}
        size="md"
        onHide={toggleEmailModal}
      >
        <p>Change customer email</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Input New Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="dryvafrica@dryvafrica.com"
            />
          </div>
        </div>
      </Modal>
      <Modal
        show={passwordModal}
        size="md"
        onHide={togglePasswordModal}
      >
        <p>Change Customer Password</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Input new password
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default Customer;
