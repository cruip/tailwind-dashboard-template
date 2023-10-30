import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import { SVGIcon } from "../partials/icons/SvgIcon";
import { useNavigate } from "react-router-dom";
import {
  CreateRouteModal,
  DeleteRouteModal,
  UpdateRouteModal,
} from "../componets/modals";
import { getAllRoutes } from "../services/routeService";
import { getTerminals } from "../services/locationService";

const Routes = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [deleteRouteModal, setDeleteRouteModal] = useState(false);
  const [addRouteModal, setAddRouteModal] = useState(false);
  const [updateRouteModal, setUpdateRouteModal] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [routes, setRoutes] = useState([]);
  const [Singledatas, setSingleData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const fecthRoutes = async () => {
    const { data, loading, errors } = await getAllRoutes();
    // console.log(data, 'routes');
    if (data) {
      setRoutes(data?.getRoutes?.nodes);
      setTimeout(() => {
        setTableLoad(false);
      }, 300);
      setLimit(data?.getRoutes?.nodes?.length);
    }
  };

  const fetchTerminals = async () => {
    const { data } = await getTerminals();
    setTerminals(data?.getTerminals?.nodes);
  };

  useEffect(() => {
    fecthRoutes();
    fetchTerminals();
  }, [currentPage]);

  //   useEffect(() => {
  //     onFilter();
  //   }, [searchQuery]);

  //   useEffect(() => {
  //     onFilterSelect();
  //   }, [filterValue]);

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const toggleDeleteRouteModal = () => {
    setDeleteRouteModal(!deleteRouteModal);
  };

  const toggleAddRouteModal = () => {
    setAddRouteModal(!addRouteModal);
  };

  const toggleUpdateRouteModal = () => {
    setUpdateRouteModal(!updateRouteModal);
  };

  const SingleData = (id) => {
    const data = routes.find((item) => item._id === id);
    setSingleData(data);
  };

  //   const onFilter = () => {
  //     if (!searchQuery) fetchAllTransport();
  //     if (searchQuery) {
  //       const arrayData = datas?.filter((item) => {
  //         if (
  //           item.name
  //             .toLowerCase()
  //             .trim()
  //             .includes(searchQuery.toLowerCase().trim())
  //         ) {
  //           return item;
  //         }
  //         return false;
  //       });
  //       setData(arrayData);
  //     }
  //   };

  //   const onFilterSelect = () => {
  //     if (filterValue === "all") fetchAllTransport();
  //     if (filterValue !== "all") {
  //       const arrayData = datas?.filter((item) => {
  //         if (
  //           item.name
  //             .toLowerCase()
  //             .trim()
  //             .includes(filterValue.toLowerCase().trim())
  //         ) {
  //           return item;
  //         }
  //         return false;
  //       });
  //       setData(arrayData);
  //     }
  //   };

  const tableHeader = [
    "Location",
    "Destination",
    "Route Name",
    "Action",
  ];

  const tableRow = (routes) => {
    return (
      <tr key={routes?._id} className="border-b-2 border-slate-200">
        <td>{routes?.from?.city}</td>
        <td>{routes?.to?.city}</td>
        <td>{routes?.name}</td>
        <td>
          <DropDown
            links={[
              {
                name: "Edit Route",
                isLink: false,
                onclick: () => {
                  setRouteId(routes?._id);
                  SingleData(routes?._id);
                  toggleUpdateRouteModal();
                },
                link: "",
                icon: "edit",
              },
              {
                name: "Delete Route",
                isLink: false,
                onclick: () => {
                  toggleDeleteRouteModal();
                  setRouteId(routes?._id);
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
          <p>Add a new route</p>
          <button
            className="px-4 py-2 text-white transition-shadow rounded-md shadow-md hover:shadow-lg w-52 bg-sky-800"
            onClick={toggleAddRouteModal}
          >
            Add Route
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            name={"Total Routes"}
            description="Total Number of Routes Created"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">
                {routes.length || 0}
              </span>{" "}
              Routes
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage transport Company"} width="w-full">
            <div className="w-full mt-4 md:flex md:items-center md:justify-between">
              {/* <div className="flex items-center w-100">
                <p className="mr-3">Filter By route Name:</p>
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
              </div> */}
              {/* <div className="flex items-center">
                <label html="search" className="sr-only">
                  Search route name
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
              </div> */}
            </div>
            <div className="mt-10">
              <Table
                data={routes}
                onNext={onNextPage}
                onPrev={onPrevPage}
                currentPage={currentPage}
                totalPages={1}
                emptyMessage="No route"
                loadingText="Loading routes..."
                loading={tableLoad}
                rowFormat={tableRow}
                headers={tableHeader}
                paginated={false}
              />
            </div>
          </Card>
        </div>
      </section>
      <CreateRouteModal
        show={addRouteModal}
        onHide={toggleAddRouteModal}
        terminals={terminals}
      />
      <DeleteRouteModal
        show={deleteRouteModal}
        onHide={toggleDeleteRouteModal}
        id={routeId}
        callBack={fecthRoutes}
      />
      <UpdateRouteModal
        show={updateRouteModal}
        onHide={toggleUpdateRouteModal}
        terminals={terminals}
        routeId={routeId}
        data={Singledatas}
        callBack={fecthRoutes}
      />
    </Page>
  );
};

export default Routes;
