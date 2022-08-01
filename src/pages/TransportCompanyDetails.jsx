import React, { useState, useEffect } from "react";
import { Card } from "../partials/card/Card";
import 'react-toastify/dist/ReactToastify.css';
import { Tab, Tabs, TabPane } from "../partials/Tabs";
import Page from "../partials/page";
import { Link, useParams } from "react-router-dom";
import Modal from "../partials/modal/Modal";
import { ToastContainer } from 'react-toastify';
import {  getOneTransport, updateTransport} from "../services/transportaterService";
// import { Link, useParams} from 'react-router-dom';

const TransportCompany = () => {
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [datas, setData] = useState(null)
  const [fetched, setFetched] = useState(false)
  const [values, setValues] = useState({
    email: datas?.email || "",
    name: datas?.name || "",
    address: datas?.address || "",
    website: datas?.website || '',
    contactPhoneNumber: datas?.contactPhoneNumber || "",
    logo: datas?.logo || "",
    status: datas?.status || 'true',
    // transporterId: 'guo',
    terminals: datas?.terminals || '629cb14b66e7a3bcc6f7212c'
  });


  const {id} = useParams();
 
  const toggleDeactivateModal = () => {
    setDeactivateModal(!deactivateModal);
  };

  const toggleActivateModal = () => {
    setActivateModal(!activateModal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const fecthTransport = async() => {
    const {data, loading, errors} = await getOneTransport(id)
    if(data) {
      setData(data?.getTransporter)
      setValues({...data?.getTransporter})
    setFetched(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    }); 
  };
  
  useEffect(() => {
   fecthTransport()
}, [])

if(!datas) {
 return <div>Loading...</div>
}
if(fetched && !datas) {
  return <div>Something went wrong</div>
}
  return (
    <Page>
       <ToastContainer />
      <div>
        <Link to={"/transport_companies"}>
          <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to {datas?.name || 'Your'} Company Profile
      </h2>
      <div className="w-full mx-auto mt-8 xl:w-4/5">
        <Card width="w-full">
          <div className="mt-5 ">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Company name: {datas?.name}
            </h2>
            <h3 className="mb-2 text-lg text-slate-600">
              website: {datas?.website}
            </h3>
            <h3 className="mb-2 text-lg text-slate-600">
              Adress: {datas?.address}
            </h3>
            <h3 className="mb-2 text-lg text-slate-600">Phone: {datas?.contactPhoneNumber}</h3>
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
        onclick={() => updateTransport({...values, transporterId: id, terminals: '629cb14b66e7a3bcc6f7212c'})}
      >
        <p>Edit this Company</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
             company name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              value={values.name || ''}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="website"
            >
             company website
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="website"
              type="text"
              placeholder="website"
              value={values.website || ''}
              onChange={handleInputChange}
              name="website"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="address"
            >
             company address
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="address"
              value={values.address || ''}
              onChange={handleInputChange}
              name="address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
             company email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
              value={values.email || ''}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
             company Phone
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="phone number"
              value={values.contactPhoneNumber || ''}
              onChange={handleInputChange}
              name="contactPhoneNumber"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="logo"
            >
             company Logo
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="logo"
              type="text"
              placeholder="paste logo url"
              value={values.logo || ''}
              onChange={handleInputChange}
              name="logo"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="status"
            >
             company status
            </label>
            <select className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values.status || 'true'}
            onChange={handleInputChange}
            name="status"
            >
              <option value='true'>
                true
              </option>
              <option value='false'>false</option>
            </select>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default TransportCompany;
