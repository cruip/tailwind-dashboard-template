import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../partials/card/Card";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import Page from "../partials/page";
import { getAllRoutes } from "../services/routeService";
import { getTerminals } from "../services/locationService";
import { AddBusModal, DeleteTripModal, EditTripModal } from "../componets/modals";
import { getOneTransport } from "../services/transporterService";
import { getAllBuses } from "../services/busService";
import Loader from "../partials/Loader";

const Trips = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [addBusModal, setAddBusModal] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [terminals, setTerminals] = useState([]);
  const [tripId, setTripId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [singleTrip, setSingleTrips] = useState(null);
  const [fetched, setFetched] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const toggleAddBusModal = () => {
    setAddBusModal(!addBusModal);
  };
  const fetchTerminals = async () => {
    const { data } = await getTerminals();
    //  console.log(data, 'terminals');
    setTerminals(data?.getTerminals?.nodes);
  };

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const SingleData = (id) => {
    const data = buses.find((item) => item._id === id);
    setSingleTrips(data);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const toggleDeletModal = () => {
    setDeleteModal(!deleteModal)
  }

  const fecthRoutes = async () => {
    const { data, loading, errors } = await getAllRoutes(1, 100000);
    if (data) {
      setRoutes(data?.getRoutes?.nodes);
      setLimit(data?.getRoutes?.nodes?.length);
    }
  };

  // const fecthTransport = async () => {
  //   const { data, loading, errors } = await getOneTransport(id);
  //   if (data) {
  //     setData(data?.getTransporter);
  //     setTableLoad(false);
  //     setFetched(true);
  //   }
  // };

    const fecthBuses = async (size, page) => {
    const { data, loading, errors } = await getAllBuses({
      size,
      page,
      filters: { companyId: id },
    });
    if (data) {
      if (data) {
        setTotalPages(
          Math.ceil(Number(data?.getBuses?.pageInfo?.totalItems) / limit)
        );
        setBuses(data?.getBuses.nodes);
        setTableLoad(false);
        setFetched(true);
      }
    }
  };


  useEffect(() => {
    // fecthTransport();
    fecthBuses(limit, currentPage)
    fecthRoutes();
    fetchTerminals();
  }, [currentPage]);
  const tableHeader = [
    "routeRoute Name",
    "Location",
    "Destination",
    "Depature Date",
    "price",
    "Action",
  ];
  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>{data?.route?.name}</td>
        <td>{data?.route?.from?.city}</td>
        <td>{data?.route?.to?.city}</td>
        <td>{data?.departureDate}</td>
        <td>{data?.price}</td>
        <td>
          <DropDown
            links={[
              {
                name: "Delete Trip",
                isLink: false,
                onclick: () => {
                  setTripId(data?._id)
                  toggleDeletModal()
                },
                link: "",
              },
              {
                name: "Edit Trip",
                isLink: false,
                onclick: () => {
                  setTripId(data?._id)
                  SingleData(data?._id)
                  toggleEditModal()
                },
                link: "",
              },
            ]}
          />
        </td>
      </tr>
    );
  };
  if (!buses) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <Loader />
      </div>
    );
  }
  if (fetched && !buses) {
    return <div>Something went wrong</div>;
  }
  return (
    <Page>
      <div>
        <button
          onClick={() => handleGoBack()}
          className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300"
        >
          Back
        </button>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold text-slate-700">
          View and manage {buses[0]?.companyId?.name || "Company"} trips
        </h4>
        <button
          className="py-3 mb-3 text-white bg-blue-500 rounded-lg shadow-md mr-7 w-52 focus:border-0 focus:outline-none hover:bg-blue-600"
          onClick={() => toggleAddBusModal()}
        >
          Add Trip
        </button>
      </div>
      <Card description={"view company trips"} width="w-full">
        <div className="mt-10 ">
          <Table
            data={buses}
            onNext={onNextPage}
            onPrev={onPrevPage}
            currentPage={currentPage}
            totalPages={totalPages}
            emptyMessage="No trips"
            loadingText="Loading trips..."
            loading={tableLoad}
            rowFormat={tableRow}
            headers={tableHeader}
            paginated={buses?.length > 0}
          />
        </div>
      </Card>
      <AddBusModal
        show={addBusModal}
        onHide={toggleAddBusModal}
        id={id}
        name={buses[0]?.companyId?.name}
        callBack={fecthBuses}
        terminals={terminals}
        routes={routes}
      />
      <DeleteTripModal
        show={deleteModal}
        onHide={toggleDeletModal}
        id={tripId}
        callBack={fecthBuses}
      />
      <EditTripModal
        show={editModal}
        onHide={toggleEditModal}
        id={id}
        name={buses[0]?.companyId?.name}
        callBack={fecthBuses}
        terminals={terminals}
        routes={routes}
        datas={singleTrip}
      />
    </Page>
  );
};

export default Trips;
