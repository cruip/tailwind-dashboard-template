import React, { useState } from "react";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import Modal from "../partials/modal/Modal";
import { SVGIcon } from "../partials/icons/SvgIcon";

const Datas = [
  {
    id: 1,
    customer_name: "Ballack",
    customer_phone: "07032880693",
    customer_email: "me@gmail.com",
  },
  {
    id: 2,
    customer_name: "Ballack",
    customer_phone: "07032880693",
    customer_email: "me@gmail.com",
  },
  {
    id: 3,
    customer_name: "Ballack",
    customer_phone: "07032880693",
    customer_email: "me@gmail.com",
  },
  {
    id: 4,
    customer_name: "Ballack",
    customer_phone: "07032880693",
    customer_email: "me@gmail.com",
  },
];

const TransportCompanies = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [tableLoad, setTableLoad] = useState(false);
  const [data, setData] = useState(Datas);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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
  const tableHeader = [
    "Company Name",
    "Company Id",
    "Company phone",
    "Company Email",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?.id} className="border-b-2 border-slate-200">
        <td>{data?.customer_name}</td>
        <td>{data?.id}</td>
        <td>{data?.customer_phone}</td>
        <td>{data?.customer_email}</td>

        <td>
          <DropDown
            links={[
              {
                name: "View Company",
                isLink: true,
                onclick: () => {},
                link: `${data.id}`,
              },
              {
                name: "Edit",
                isLink: false,
                onclick: () => {
                    toggleEditModal();
                },
                link: "",
              },
              {
                name: "De-Activate Company",
                isLink: false,
                onclick: () => {
                  toggleDeactivateModal();
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
      <section>
        <div className="flex items-center justify-between mb-6">
          <p>Add a Transport Company</p>
          <button className="px-4 py-2 text-white rounded-md w-52 bg-sky-800">
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
                data={data}
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
    </Page>
  );
};

export default TransportCompanies;
