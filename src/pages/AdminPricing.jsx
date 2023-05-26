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
    location: "Jibowu park Lagos",
    destination: "Old park Enugu",
    Company_Name: "Ifesinachi",
    price: "15,000",
  },
  {
    id: 2,
    location: "Jibowu park Lagos",
    destination: "Old park Enugu",
    Company_Name: "Ifesinachi",
    price: "15,000",
  },
  {
    id: 3,
    location: "Jibowu park Lagos",
    destination: "Old park Enugu",
    Company_Name: "Ifesinachi",
    price: "15,000",
  },
  {
    id: 4,
    location: "Jibowu park Lagos",
    destination: "Old park Enugu",
    Company_Name: "Ifesinachi",
    price: "15,000",
  },
];

const AdminPricing = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [tableLoad, setTableLoad] = useState(false);
  const [data, setData] = useState(Datas);
  const [changePriceModal, setChangePriceModal] = useState(false);
  const [tempPriceModal, setTempPriceModal] = useState(false);

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const toggleChangePriceModal = () => {
    setChangePriceModal(!changePriceModal);
  };

  const toggleTempPriceModal = () => {
    setTempPriceModal(!tempPriceModal);
  };
  const tableHeader = [
    "Location",
    "Destination",
    "Company Name",
    "Price",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?.id} className="border-b-2 border-slate-200">
        <td>{data?.location}</td>
        <td>{data?.destination}</td>
        <td>{data?.Company_Name}</td>
        <td>{data?.price}</td>

        <td>
          <DropDown
            links={[
              {
                name: "Change Price",
                isLink: false,
                onclick: () => {
                  toggleChangePriceModal();
                },
                link: "",
              },
              {
                name: "Create temp price cut",
                isLink: false,
                onclick: () => {
                  toggleTempPriceModal();
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Card description={"Manage transport Pricing"} width="w-full">
            <div className="md:flex items-center justify-between w-full mt-4">
              <div className="flex md:justify-between mb-2 items-center w-100 md:w-1/2">
                <p className="mr-3 ">Filter By Price:</p>
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
                    className="md:ml-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        show={changePriceModal}
        size="md"
        onHide={toggleChangePriceModal}
        buttonText="De-Activate"
      >
        <p>Do you want to change the price for this destination?? </p>
      </Modal>
      <Modal
        show={tempPriceModal}
        size="md"
        onHide={toggleTempPriceModal}
        buttonText="Edit"
      >
        <p>Add a Temporary Price Cut For This Destination</p>
      </Modal>
    </Page>
  );
};

export default AdminPricing;
