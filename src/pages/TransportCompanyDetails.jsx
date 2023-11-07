import React, { useState, useEffect } from "react";
import { Card } from "../partials/card/Card";
import "react-toastify/dist/ReactToastify.css";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getOneTransport,
} from "../services/transporterService";
// import { getAllBuses } from "../services/busService";
import { getAllRoutes } from "../services/routeService";
import { getTerminals } from "../services/locationService";
import {DeactivateTransport, ActivateTransportModal, EditTransportModal, AddRouteModal, AddBusModal, AddBusRouteModal, RemoveCompanyRouteModal} from "../componets/modals";
import Loader from "../partials/Loader";

const TransportCompany = () => {
  const [limit, setLimit] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  // const [deactivateModal, setDeactivateModal] = useState(false);
  // const [activateModal, setActivateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addRouteModal, setAddRouteModal] = useState(false);
  const [addBusRouteModal, setAddBusRouteModal] = useState(false);
  const [addBusModal, setAddBusModal] = useState(false);
  const [deleteRouteModal, setDeleteRouteModal] = useState(false);
  const [datas, setData] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [terminals, setTerminals] = useState([]);
  // const [buses, setBuses] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [routeId, setRouteId] = useState('');

  const { id } = useParams();

  // const toggleDeactivateModal = () => {
  //   setDeactivateModal(!deactivateModal);
  // };

  // const toggleActivateModal = () => {
  //   setActivateModal(!activateModal);
  // };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const toggleAddRouteModal = () => {
    setAddRouteModal(!addRouteModal);
  };
  const toggleAddBusRouteModal = (id) => {
    setRouteId(id)
    setAddBusRouteModal(!addBusRouteModal);
    
  };

  const toggleDeleteRouteModal = () => {
    setDeleteRouteModal(!deleteRouteModal)
  }
  const toggleAddBusModal = () => {
    setAddBusModal(!addBusModal);
  };

  const onPrevPage = () => {};

  const onNextPage = () => {};
  const navigate = useNavigate();

  function handlenavClick() {
    navigate("trips");
  }



  const fecthTransport = async () => {
    const { data, loading, errors } = await getOneTransport(id);
    if (data) {
      setData(data?.getTransporter);
      setFetched(true);
    }
  };

  // const fecthBuses = async () => {
  //   const { data, loading, errors } = await getAllBuses();
  //   if (data) {
  //     setBuses(data?.getBuses.nodes);
  //     // setFetched(true);
  //   }
  // };

  const fetchTerminals = async () => {
    const { data } = await getTerminals();
  //  console.log(data, 'terminals');
   setTerminals(data?.getTerminals?.nodes)
  };

  const fecthRoutes = async () => {
    const { data, loading, errors } = await getAllRoutes(1, 100000);
    // console.log(data, 'routes');
    if (data) {
    
      setRoutes(data?.getRoutes?.nodes);
     setTimeout(() => {
      setTableLoad(false);
     }, 300);
      setLimit(data?.getRoutes?.nodes?.length);
    }
  };

  useEffect(() => {
    fecthTransport();
    fecthRoutes();
    // fecthBuses()
    fetchTerminals()
  }, []);

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
                name: "Remove Route",
                isLink: false,
                onclick: () => {
                  toggleDeleteRouteModal();
                  setRouteId(routes?._id)
                },
                link: "",
              }
            ]}
          />
        </td>
      </tr>
    );
  };

  if (!datas) {
    return <div className="flex items-center justify-center w-full h-screen ">
        <Loader />
    </div>;
  }
  if (fetched && !datas) {
    return <div>Something went wrong</div>;
  }
  return (
    <Page>
      {/* <ToastContainer /> */}
      <div>
        <Link to={"/transport_companies"}>
          <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to {datas?.name || "Your"} Company Profile
      </h2>
      <div className="w-full mt-8 mb-10 mr-auto xl:w-4/5">
        <Card width="w-full">
          <div className="flex items-center mt-5 ">
            <div>
              <img
                src={datas?.logo}
                alt="logo"
                className="w-48 h-48 mr-6 rounded-full "
              />
            </div>
            <div className="ml-3 ">
              <h2 className="mb-4 text-xl font-semibold text-slate-800">
                Company name: {datas?.name}
              </h2>
              <h3 className="mb-2 text-lg text-slate-600">
                website: {datas?.website}
              </h3>
              <h3 className="mb-2 text-lg text-slate-600">
                Adress: {datas?.address}
              </h3>
              <h3 className="mb-2 text-lg text-slate-600">
                Phone: {datas?.contactPhoneNumber}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-6">
           
            <button
              className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
              onClick={() => toggleEditModal()}
            >
              Edit
            </button>
            <button
              className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
              onClick={() => toggleAddRouteModal()}
            >
             Add Route
            </button>
            <button
              className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
              onClick={() => toggleAddBusModal()}
            >
             Add Trip
            </button>
            <button
              className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
              onClick={() => handlenavClick()}
            >
            View All Trips
            </button>
          </div>
        </Card>
      </div>

      <Card description={"view company routes"} width="w-full">
        <div className="mt-10 ">
          <Table
            data={datas.routes}
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

      {/* //modals */}
      {/* <DeactivateTransport show={deactivateModal}  onHide={toggleDeactivateModal} id={id} callBack={fecthTransport}/> */}
      <AddRouteModal show={addRouteModal}  onHide={toggleAddRouteModal} id={id} name={datas?.name} callBack={fecthTransport} routes={routes}/>
      {/* <AddBusRouteModal show={addBusRouteModal}  onHide={toggleAddBusRouteModal} id={routeId} name={datas?.name} buses={buses}/> */}
      <AddBusModal show={addBusModal}  onHide={toggleAddBusModal} id={id} name={datas?.name} callBack={fecthTransport} terminals={terminals} routes={routes}/>
      {/* <ActivateTransportModal show={activateModal}  onHide={toggleActivateModal} id={id} callBack={fecthTransport}/> */}
      <EditTransportModal show={editModal} onHide={toggleEditModal} id={id} callBack={fecthTransport} datas={datas} terminals={terminals}/>
      <RemoveCompanyRouteModal show={deleteRouteModal} onHide={toggleDeleteRouteModal} id={routeId} companyId={id} callBack={fecthRoutes} />
    </Page>
  );
};

export default TransportCompany;
