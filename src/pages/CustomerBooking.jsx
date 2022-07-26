import React, { useState } from "react";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";

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
      <tr key={data?.id} className="border-b-2 border-slate-200">
        <td>{data?.customer_name}</td>
        <td>{data?.company_name}</td>
        <td>{data?.amount}</td>
        <td>{data?.seat_no}</td>

        <td>
          <DropDown links={[
            {
              name: 'View Booking',
              isLink: true,
              onclick: () => {console.log('kki')},
              link: `${data.id}`,
            },
            {
              name: 'cancel Booking',
              isLink: false,
              onclick: () => {console.log('kki')},
              link: '',
            },
            {
              name: 'View Invoice',
              isLink: false,
              onclick: () => {console.log('kki')},
              link: '',
            },
            {
              name: 'Confirm Booking',
              isLink: false,
              onclick: () => {console.log('kki')},
              link: '',
            },
            {
              name: 'Reschedule Booking',
              isLink: false,
              onclick: () => {console.log('kki')},
              link: '',
            },
          ]}/>
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
            <h3 className="mt-5 text-right"><span className="text-xl font-semibold text-sky-800">1000</span> Seats</h3>
          </Card>
          <Card
            name={"Total Unbooked Seat"}
            description="Total Number of Unbooked seats"
          >
            <h3 className="mt-5 text-right "><span className="text-xl font-semibold text-sky-800">4000</span> Seats</h3>
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
