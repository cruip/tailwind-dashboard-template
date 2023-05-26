import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import { SVGIcon } from "../partials/icons/SvgIcon";
import {
  EditTransportModal,
  AddTransportModal,
  DeleteTransportModal,
} from "../componets/modals";
import { getAllTransporter } from "../services/transporterService";
import { getAllLocations, getTerminals } from "../services/locationService";

const TransportCompanies = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [datas, setData] = useState(null);
  // const [locations, setLocations] = useState(null)
  const [activeCompany, setActiveCompany] = useState(0);
  const [inActiveCompany, setInActiveCompany] = useState(0);
  const [Singledatas, setSingleData] = useState(null);
  const [companyNames, setCompanyNames] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [id, setId] = useState("");
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addTransportModal, setAddTransportModal] = useState(false);

  const [terminals, setTerminals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const fetchAllTransport = async (size = 10, page) => {
    const { data, loading } = await getAllTransporter({ size, page });
    setTableLoad(false);
    setData(data?.getTransporters?.nodes);
    setCurrentPage(Number(data?.getTransporters?.pageInfo?.currentPage));
    setTotalPages(
      Math.ceil(Number(data?.getTransporters?.pageInfo?.totalItems) / limit)
    );
    let categories = [
      ...new Set(data?.getTransporters?.nodes?.map((trans) => trans.name)),
    ];
    setCompanyNames(categories);
    // console.log("transport fetched", data?.getTransporters?.nodes);
  };

  const fetchUnpaginatedTransport = async () => {
    const { data } = await getAllTransporter(1, 100000);
    const activeCompany = data?.getTransporters?.nodes?.filter(
      (item) => item.status == "true"
    );
    const inActiveCompany = data?.getTransporters?.nodes?.filter(
      (item) => item.status != "true"
    );
    setActiveCompany(activeCompany?.length);
    setInActiveCompany(inActiveCompany?.length);
  };

  // const fetchLocations = async () => {
  //   const { data } = await getAllLocations();
  //  console.log(data, 'loca');
  // //  setLocations(data?.getLocations?.nodes)
  // };

  const fetchTerminals = async () => {
    const { data } = await getTerminals();
    //  console.log(data, 'loca');
    setTerminals(data?.getTerminals?.nodes);
  };

  const SingleData = (id) => {
    const data = datas.find((item) => item._id === id);
    setSingleData(data);
  };

  useEffect(() => {
    fetchAllTransport(10, currentPage);
    fetchUnpaginatedTransport();
    fetchTerminals();
  }, [currentPage]);

  useEffect(() => {
    onFilter();
  }, [searchQuery]);

  useEffect(() => {
    onFilterSelect();
  }, [filterValue]);

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
    setEditModal(!editModal);
  };

  const toggleAddTransporModal = () => {
    setAddTransportModal(!addTransportModal);
  };

  // const handleTerminal = (value) => {
  //   setTerminals([
  //     ...terminals, value
  //   ])
  //   console.log(terminals, 'terminal');
  // }

  const onFilter = () => {
    if (!searchQuery) fetchAllTransport();
    if (searchQuery) {
      const arrayData = datas?.filter((item) => {
        if (
          item.name
            .toLowerCase()
            .trim()
            .includes(searchQuery.toLowerCase().trim())
        ) {
          return item;
        }
        return false;
      });
      setData(arrayData);
    }
  };

  const onFilterSelect = () => {
    if (filterValue === "all") fetchAllTransport();
    if (filterValue !== "all") {
      const arrayData = datas?.filter((item) => {
        if (
          item.name
            .toLowerCase()
            .trim()
            .includes(filterValue.toLowerCase().trim())
        ) {
          return item;
        }
        return false;
      });
      setData(arrayData);
    }
  };

  const tableHeader = [
    "Company Name",
    "Company Address",
    "Company phone",
    "Company Website",
    // "status",
    "Action",
  ];

  const tableRow = (datas) => {
    return (
      <tr key={datas?._id} className="border-b-2 border-slate-200">
        <td>{datas?.name}</td>
        <td>{datas?.address}</td>
        <td>{datas?.contactPhoneNumber}</td>
        <td>{datas?.website || "No Website"}</td>
        {/* <td>{datas?.status == 'true' ? 'Active' : 'Inactive'}</td> */}
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
                  setId(datas?._id);
                  SingleData(datas?._id);
                },
                link: "",
                icon: "edit",
              },
              {
                name: "Delete Company",
                isLink: false,
                onclick: () => {
                  toggleDeactivateModal();
                  setId(datas?._id);
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
          <button
            className="px-4 py-2 text-white transition-shadow rounded-md shadow-md hover:shadow-lg w-52 bg-sky-800"
            onClick={toggleAddTransporModal}
          >
            Add Company
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            name={"Active Transport Companies"}
            description="Total Number of Active Transport Companies"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">
                {activeCompany || 0}
              </span>{" "}
              Companies
            </h3>
          </Card>
          <Card
            name={"Inactive Transport Companies"}
            description="Total Number of Inactive Transport Companies"
          >
            <h3 className="mt-5 text-right ">
              <span className="text-xl font-semibold text-sky-800">
                {inActiveCompany || 0}
              </span>{" "}
              Companies
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage transport Company"} width="w-full">
            <div className="md:flex md:items-center md:justify-between w-full mt-4">
              <div className="flex items-center w-100">
                <p className="mr-3">Filter By company Name:</p>
                <select
                  className="block w-1/2 px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <option value="all">All</option>
                  {companyNames?.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label html="search" className="sr-only">
                  Search company name
                </label>
                <div className="relative w-full mt-2 md:mt-0">
                  <input
                    type="text"
                    id="search"
                    className="ml-1 md:ml-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search company name"
                    required
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
            <div className="mt-10">
              <Table
                data={datas}
                onNext={onNextPage}
                onPrev={onPrevPage}
                currentPage={currentPage}
                totalPages={totalPages}
                emptyMessage="No transports"
                loadingText="Loading transports..."
                loading={tableLoad}
                rowFormat={tableRow}
                headers={tableHeader}
                paginated={datas?.length > 0}
              />
            </div>
          </Card>
        </div>
      </section>

      <DeleteTransportModal
        show={deactivateModal}
        onHide={toggleDeactivateModal}
        id={id}
        callBack={fetchAllTransport}
      />
      <EditTransportModal
        show={editModal}
        onHide={toggleEditModal}
        id={id}
        callBack={fetchAllTransport}
        datas={Singledatas}
        terminals={terminals}
      />
      <AddTransportModal
        show={addTransportModal}
        onHide={toggleAddTransporModal}
        callBack={fetchAllTransport}
        terminals={terminals}
      />
    </Page>
  );
};

export default TransportCompanies;
