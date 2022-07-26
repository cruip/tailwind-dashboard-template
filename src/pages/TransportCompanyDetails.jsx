import React, { useState } from "react";
import { Card } from "../partials/card/Card";
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Link } from "react-router-dom";
import Modal from "../partials/modal/Modal";

const TransportCompany = () => {
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleDeactivateModal = () => {
    setDeactivateModal(!deactivateModal);
  };

  const toggleActivateModal = () => {
    setActivateModal(!activateModal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  return (
    <Page>
      <div>
        <Link to={"/transport_companies"}>
          <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to GUO Company Profile
      </h2>
      <div className="w-full mx-auto mt-8 xl:w-4/5">
        <Card width="w-full">
          <div className="mt-5 ">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Company name: GUO
            </h2>
            <h3 className="mb-2 text-lg text-slate-600">
              email: okenwa1993@gmail.com
            </h3>
            <h3 className="mb-2 text-lg text-slate-600">
              Adress: Okestina close enugu
            </h3>
            <h3 className="mb-2 text-lg text-slate-600">Phone: 07023880693</h3>
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
              onClick={() => toggleEditModal()}
            >
              Edit
            </button>
            
          </div>
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
        show={editModal}
        size="md"
        onHide={toggleEditModal}
        buttonText="Edit"
      >
        <p>Edit this Company</p>
      </Modal>
    </Page>
  );
};

export default TransportCompany;
