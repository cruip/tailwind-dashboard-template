import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import { SVGIcon } from "../partials/icons/SvgIcon";
import { useNavigate } from "react-router-dom";
import {
  DeleteRouteModal,
  UpdateRouteModal,
  CreateTerminalModal,
  UpdateTerminalModal,
  DeleteTerminalModal
} from "../componets/modals";
import { getAllRoutes } from "../services/routeService";
import { getTerminals } from "../services/locationService";

const Terminals = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTerminals, setTotalTerminals] = useState(0);
  const [deleteTerminalModal, setDeleteTerminalModal] = useState(false);
  const [addTerminalModal, setAddTerminalModal] = useState(false);
  const [updateTerminalModal, setUpdateTerminalModal] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [terminalId, setTerminalId] = useState("");
  const [Singledatas, setSingleData] = useState(null);


  const fetchTerminals = async (currentPage, size) => {
    const { data } = await getTerminals(currentPage, size);
    setTerminals(data?.getTerminals?.nodes);
    setTimeout(() => {
        setTableLoad(false);
      }, 300);
    //   setLimit(data?.getRoutes?.nodes?.length);
      setTotalTerminals(Number(data?.getTerminals?.pageInfo?.totalItems))
      setTotalPages(
        Math.ceil(Number(data?.getTerminals?.pageInfo?.totalItems) / limit)
      );
  };

  useEffect(() => {
    fetchTerminals(currentPage, limit);
  }, [currentPage]);

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const toggleDeleteTerminalModal = () => {
    setDeleteTerminalModal(!deleteTerminalModal);
  };

  const toggleAddTerminalModal = () => {
    setAddTerminalModal(!addTerminalModal);
  };

  const toggleUpdateTerminalModal = () => {
    setUpdateTerminalModal(!updateTerminalModal);
  };

  const SingleData = (id) => {
    const data = terminals.find((item) => item._id === id);
    setSingleData(data);
  };

  const tableHeader = [
    "City",
    "Address",
    "Location Name",
    "Action",
  ];

  const tableRow = (terminal) => {
    return (
      <tr key={terminal?._id} className="border-b-2 border-slate-200">
        <td>{terminal?.city}</td>
        <td>{terminal?.address}</td>
        <td>{terminal?.locationName}</td>
        <td>
          <DropDown
            links={[
              {
                name: "Edit Route",
                isLink: false,
                onclick: () => {
                  setTerminalId(terminal?._id);
                  SingleData(terminal?._id);
                  toggleUpdateTerminalModal();
                },
                link: "",
                icon: "edit",
              },
              {
                name: "Delete Route",
                isLink: false,
                onclick: () => {
                    toggleDeleteTerminalModal();
                  setTerminalId(terminal?._id);
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
          <p>Add a new terminal</p>
          <button
            className="px-4 py-2 text-white transition-shadow rounded-md shadow-md hover:shadow-lg w-52 bg-sky-800"
            onClick={toggleAddTerminalModal}
          >
            Add Terminal
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card
            name={"Total Terminals"}
            description="Total Number of Terminals Created"
          >
            <h3 className="mt-5 text-right">
              <span className="text-xl font-semibold text-sky-800">
                {totalTerminals || 0}
              </span>{" "}
              Terminals
            </h3>
          </Card>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage transport Company"} width="w-full">
            <div className="w-full mt-4 md:flex md:items-center md:justify-between">
            </div>
            <div className="mt-10">
              <Table
                data={terminals}
                onNext={onNextPage}
                onPrev={onPrevPage}
                currentPage={currentPage}
                totalPages={totalPages}
                emptyMessage="No route"
                loadingText="Loading routes..."
                loading={tableLoad}
                rowFormat={tableRow}
                headers={tableHeader}
                paginated={terminals.length > 1}
              />
            </div>
          </Card>
        </div>
      </section>
      {/* <CreateRouteModal
        show={addRouteModal}
        onHide={toggleAddRouteModal}
        terminals={terminals}
      /> */}
       <CreateTerminalModal
        show={addTerminalModal}
        onHide={toggleAddTerminalModal}
        callBack={fetchTerminals}
      />
      <DeleteTerminalModal
        show={deleteTerminalModal}
        onHide={toggleDeleteTerminalModal}
        id={terminalId}
        callBack={fetchTerminals}
      />
      <UpdateTerminalModal
        show={updateTerminalModal}
        onHide={toggleUpdateTerminalModal}
        terminals={terminals}
        terminalId={terminalId}
        data={Singledatas}
        callBack={fetchTerminals}
      />
    </Page>
  );
};

export default Terminals;
