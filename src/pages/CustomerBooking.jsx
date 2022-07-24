import React, { useState } from "react";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";

const Datas = [
  {
    id: 1,
    customer_name: "Ballack",
    company_name: "GUO",
    amount: "100,000",
    seat_no: "4A",
  },
  {
    id: 2,
    customer_name: "Ballack",
    company_name: "GUO",
    amount: "100,000",
    seat_no: "4A",
  },
  {
    id: 3,
    customer_name: "Ballack",
    company_name: "GUO",
    amount: "100,000",
    seat_no: "4A",
  },
  {
    id: 4,
    customer_name: "Ballack",
    company_name: "GUO",
    amount: "100,000",
    seat_no: "4A",
  },
];

const CustomerBooking = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [tableLoad, setTableLoad] = useState(false);

  const [data, setData] = useState(Datas);
  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const tableHeader = [
    "Customer Name",
    "Company Name",
    "Amount Paid",
    "Seat No",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>{data?.customer_name}</td>
        <td>{data?.company_name}</td>
        <td>{data?.amount}</td>
        <td>{data?.seat_no}</td>

        <td>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white rounded-lg bg-sky-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            action {" "}
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            id="dropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Page>
      <section>
        <div className="flex items-center justify-between mb-6">
          <p>Book a seat</p>
          <button className="px-4 py-2 text-white rounded-md w-52 bg-sky-800">
            Book Seat
          </button>
        </div>
        <div className="gap-8 columns-2">
          <Card
            name={"Total Seat Booked"}
            description="Total Number of booked seats"
          >
            <h3>1000 Seats</h3>
          </Card>
          <Card
            name={"Total Unbooked Seat"}
            description="Total Number of Unbooked seats"
          >
            <h3>4000 Seats</h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage Booking"} width="w-full">
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
    </Page>
  );
};

export default CustomerBooking;
