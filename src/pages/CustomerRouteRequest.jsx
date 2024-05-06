import React, { useEffect, useState } from "react";
import Page from "../partials/page";
import { Card } from "../partials/card/Card";
import { Table } from "../partials/table";
import { getCustomerRouteRequest } from "../services/bookingsService";
import DropDown from "../partials/DropDown";
import { DeleteRouteSuggestion } from "../componets/modals/customers/DeleteRouteSuggestion";
import { UpdateRouteSuggestion } from "../componets/modals/customers/UpdateRouteSuggestion";

export const CustomerRouteRequest = () => {
  const tableHeader = [
    "Vendor Name",
    "customer Email",
    "phone Number",
    "Route",
    "attendedTo",
    "Action",
  ];
  // states
  const size = 10;
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [routeRequests, setRouteRequests] = useState([]);
  const [showUpdateRouteModal, setShowUpdateRouteModal] = useState(false);
  const [showDeleteRouteModal, setShowDeleteRouteModal] = useState(false);
  const [routeId, setRouteId] = useState("");
  //   const [editForm, setEditForm] = useState({

  //   });
  //   function

  const handleGetRouteRequests = async (page, size) => {
    try {
      const { data, loading, errors } = await getCustomerRouteRequest(
        page,
        size
      );
      setLimit(data?.getRouteRequests?.nodes?.length);
      setRouteRequests(data?.getRouteRequests?.nodes);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoad(false);
    }
  };

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  //   side-effects
  useEffect(() => {
    handleGetRouteRequests(currentPage, size);
  }, [currentPage]);

  //   function captureEdit(clickedItem) {
  //     setEditForm(clickedItem);
  //   }
  //
  const replacedExpression = (expression) => expression?.replace(/\+/g, "to");
  const tableRow = (data) => {
    return (
      <tr key={data?._id} className="border-b-2 border-slate-200">
        <td>{data?.vendorName?.toUpperCase()}</td>
        <td>{data?.customerEmail}</td>
        <td>{data?.phoneNumber}</td>
        <td>{replacedExpression(data?.route)}</td>
        <td>{data?.attendedTo ? "Yes" : "No"}</td>
        <td>
          <DropDown
            links={[
              {
                name: "Edit Customer's Route Request",
                isLink: false,
                onclick: () => {
                  setShowUpdateRouteModal(true);
                  //   captureEdit(data);
                  setRouteId(data?._id);
                },
                link: "",
                icon: "edit",
              },
              {
                name: "Delete Customer's Route Request",
                isLink: false,
                onclick: () => {
                  setShowDeleteRouteModal(true);
                  setRouteId(data?._id);
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
          <h4>Customer's Route Request </h4>
        </div>
        <section className="mt-10 ">
          <div className="col-12">
            <Card description={""} width="w-full">
              <div className="mt-10 ">
                <Table
                  data={routeRequests}
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
      </section>
      <DeleteRouteSuggestion
        show={showDeleteRouteModal}
        onHide={() => setShowDeleteRouteModal(false)}
        callBack={handleGetRouteRequests}
        requestId={routeId}
      />
      <UpdateRouteSuggestion
        show={showUpdateRouteModal}
        onHide={() => setShowUpdateRouteModal(false)}
        callBack={handleGetRouteRequests}
        requestId={routeId}
      />
    </Page>
  );
};
