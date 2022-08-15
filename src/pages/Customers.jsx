import React, { useEffect, useState } from "react";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import Modal from "../partials/modal/Modal";
import { SVGIcon } from "../partials/icons/SvgIcon";
import { getAllUsers } from "../services/userService";

const Customers = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [data, setData] = useState(null);
  const [activeUser, setActiveUser] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllUser = async() => {
    const {data, loading} = await getAllUsers(currentPage, limit)
    setTableLoad(false)
    setData(data?.getUsers?.nodes)
    // console.log(data?.getUsers?.nodes, 'pop')
    setCurrentPage(data?.getUsers?.pageInfo?.currentPage)
    setTotalPages(Math.ceil(Number(data?.getUsers?.pageInfo?.totalItems)/limit))
  }

  const fetchUnpaginatedUser = async () => {
    const { data} = await getAllUsers(1, 100000);
    const activeUsers = data?.getUsers?.nodes?.filter((item) => item.isEmailVerified)
    setActiveUser(activeUsers?.length)
    setTotalUsers(data?.getUsers?.nodes?.length)
  };

  const onFilter = () => {
    if(!searchQuery) fetchAllUser();
    if (searchQuery ) {
      const arrayData = data?.filter((item) => { 
        if (
          item.firstName
            .toLowerCase()
            .trim()
            .includes(searchQuery.toLowerCase().trim() )
            || item.lastName
            .toLowerCase()
            .trim()
            .includes(searchQuery.toLowerCase().trim() )
        ) {
          
          return item
        }
        return false
      });
      setData(arrayData);
    }
  };

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

  useEffect(() => {
    fetchUnpaginatedUser()
  }, [])

  useEffect(() => {
    fetchAllUser()
  }, [currentPage])

  useEffect(() => {
    onFilter()
  }, [searchQuery])
  
  const tableHeader = [
    "Customer Name",
    "Booking Stat",
    "customer phone",
    "customer Email",
    "Action",
  ];

  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>{data?.firstName || ''} {data?.lastName || ''}</td>
        <td>{data?.booking ? 'has bookings' : 'has no booking'}</td>
        <td >{data?.phoneNo}</td>
        <td>{data?.email}</td>

        <td>
          <DropDown
            links={[
              {
                name: "View Profile",
                isLink: true,
                onclick: () => {},
                link: `${data?._id}`,
              },
              {
                name: "De-Activate Customer",
                isLink: false,
                onclick: () => {
                  toggleDeactivateModal();
                },
                link: "",
              },
              {
                name: "Re-Activate Customer",
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
       
        <div className="gap-8 columns-2">
          <Card
            name={"Active Customers"}
            description="Total Number of Customers with Verified email"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">{activeUser || 0}</span>{" "}
              Customers
            </h3>
          </Card>
          <Card
            name={"Total Customers"}
            description="Total Number of Customers"
          >
            <h3 className="mt-5 text-right ">
              <span className="text-xl font-semibold text-sky-800">{totalUsers || 0}</span>{" "}
              Customers
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage Customer"} width="w-full">
            <div className="flex items-center justify-end w-full ">
              
              <div className="flex items-center">
                <label html="search" className="sr-only">
                  Search customer name
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search customer"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                paginated={data?.length > 0}
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
        <p>Reactivate this Customer</p>
      </Modal>
    </Page>
  );
};

export default Customers;
