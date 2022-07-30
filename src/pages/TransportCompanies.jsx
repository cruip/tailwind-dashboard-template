import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import Modal from "../partials/modal/Modal";
import { SVGIcon } from "../partials/icons/SvgIcon";
import { ToastContainer } from 'react-toastify';
// import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { getAllTransporter, addTransport, deleteTransport} from "../services/transportaterService";


const TransportCompanies = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [tableLoad, setTableLoad] = useState(true);
  const [datas, setData] = useState(null);
  const [id, setId] = useState('');
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addTransportModal, setAddTransportModal] = useState(false);
  const [values, setValues] = useState({
    email: "",
    name: "",
    address: "",
    website: '',
    contactPhoneNumber: "",
    logo: "",
    status: 'true',
    transporterId: 'guo',
    terminals: ['629cb14b66e7a3bcc6f7212c']
  });

  const fetchAllTransport = async() => {
    const {data, loading} = await getAllTransporter()
    setTableLoad(false)
    setData(data?.getTransporters?.nodes)
  }
    useEffect(() => {
      fetchAllTransport()
    }, [])

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const toggleDeactivateModal = () => {
    setDeactivateModal(!deactivateModal);
  };

  const toggleActivateModal = () => {
    setActivateModal(!activateModal);
  };
  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const toggleAddTransporModal = () => {
    setAddTransportModal(!addTransportModal)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    }); 
  };

  const handleCreateTranport = () => {
   if(Object.values(values).some(o => o === '')) return false;
    addTransport({...values})
    fetchAllTransport()
  };

  // const deleteSingleTransport = () => {
  //   console.log(id, 'id');
  //   deleteTransport(id)
  // }
  
  const tableHeader = [
    "Company Name",
    "Company Address",
    "Company phone",
    "Company Website",
    "Action",
  ];

  const tableRow = (datas) => {
    return (
      <tr key={datas?._id} className="border-b-2 border-slate-200">
        <td>{datas?.name}</td>
        <td>{datas?.address}</td>
        <td>{datas?.contactPhoneNumber}</td>
        <td>{datas?.website}</td>

        <td>
          <DropDown
            links={[
              {
                name: "View Company",
                isLink: true,
                onclick: () => {},
                link: `${datas?._id}`,
              },
              {
                name: "Edit",
                isLink: false,
                onclick: () => {
                    toggleEditModal();
                    setId(datas?._id)
                },
                link: "",
              },
              {
                name: "Delete Company",
                isLink: false,
                onclick: () => {
                  toggleDeactivateModal();
                  setId(datas?._id)
                },
                link: "",
              },
              {
                name: "Re-Activate Company",
                isLink: false,
                onclick: () => {
                  toggleActivateModal();
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
      <ToastContainer />
      <section>
        <div className="flex items-center justify-between mb-6">
          <p>Add a Transport Company</p>
          <button className="px-4 py-2 text-white rounded-md w-52 bg-sky-800" onClick={toggleAddTransporModal}>
            Add Company
          </button>
        </div>
        <div className="gap-8 columns-2">
          <Card
            name={"Active Transport Companies"}
            description="Total Number of Active Transport Companies"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">1000</span>{" "}
              Companies
            </h3>
          </Card>
          <Card
            name={"Inactive Transport Companies"}
            description="Total Number of Inactive Transport Companies"
          >
            <h3 className="mt-5 text-right ">
              <span className="text-xl font-semibold text-sky-800">4000</span>{" "}
              Companies
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage transport Company"} width="w-full">
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center w-1/2">
                <p className="mr-3 ">Filter By company Name:</p>
                <select className="block w-1/2 px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline">
                  <option>All</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              <div className="flex items-center">
                <label html="search" className="sr-only">
                  Search company name
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search company name"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <SVGIcon name="search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 ">
              <Table
                data={datas}
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
      <Modal
        show={deactivateModal}
        size="md"
        onHide={toggleDeactivateModal}
        buttonText="Delete"
        onclick={() => deleteTransport(id)}
      >
        <p>Do you want to Delete this account? </p>
      </Modal>
      <Modal
        show={activateModal}
        size="md"
        onHide={toggleActivateModal}
        buttonText="Activate"
      >
        <p>Reactivate this Company</p>
      </Modal>
      <Modal
        show={editModal}
        size="md"
        onHide={toggleEditModal}
        buttonText="Edit"
      >
        <p>Edit this Company</p>
      </Modal>
      <Modal
        show={addTransportModal}
        size="md"
        onHide={toggleAddTransporModal}
        buttonText="Add"
        onclick = {handleCreateTranport}
      >
        <p>Add a transport company</p>
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
              value={values.name}
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
              value={values.website}
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
              value={values.address}
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
              value={values.email}
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
              type="telephone"
              placeholder="phone number"
              value={values.contactPhoneNumber}
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
              value={values.logo}
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
            value={values.status}
            onChange={handleInputChange}
            name="status"
            >
              <option value='true'>
                true
              </option>
              <option value='false'>false</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="id"
            >
             location Id
            </label>
            <select className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values.transporterId}
            onChange={handleInputChange}
            name="transporterId"
            >
              <option value=''>
                GUO
              </option>
              <option value='gog'>GOG</option>
              <option value='ekeson'>EKESON</option>
              <option value='libra'>LIBRA</option>
              <option value="young">THE_YOUNG</option>
            </select>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default TransportCompanies;
