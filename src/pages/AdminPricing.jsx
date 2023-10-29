import React, { useState, useEffect } from "react";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import { SVGIcon } from "../partials/icons/SvgIcon";
import { Commissions } from "../services/commissionService";
import { getAllTransporter } from "../services/transporterService";
import { UpdateCommissionModal, DeleteCommissionModal, AddCommissionModal } from "../componets/modals";



const AdminPricing = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [Singledatas, setSingleData] = useState(null);
  const [commissionId, setCommisionId] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [deleteCommissionModal, setDeleteCommissionModal] = useState(false);
  const [updateCommissionModal, setUpdateCommissionModal] = useState(false);
  const [addCommissionModal, setAddCommissionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const fecthCommissions = async (size=100, page) => {
    try {
      
      const { data, loading, errors } = await Commissions({size, page});
      setLimit(data?.getCommissions?.nodes?.length);
      setData(data?.getCommissions?.nodes)
    } catch (error) {
      console.log(error);
    }finally {
      setTableLoad(false);
    }
   
  };

  const fetchTransport = async () => {
   try {
    const { data } = await getAllTransporter(1, 100000);
    setCompanies(data?.getTransporters?.nodes);
   } catch (error) {
    console.log(error);
   }
    
  };

  const onFilter = () => {
    if (!searchQuery)  fecthCommissions(10, currentPage);;
    if (searchQuery) {
      const arrayData = data?.filter((item) => {
        if (
          item.company.name
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

  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const toggleDeleteCommissionModal = () => {
    setDeleteCommissionModal(!deleteCommissionModal);
  };

  const toggleAddCommissionModal = () => {
    setAddCommissionModal(!addCommissionModal);
  };

  const toggleUpdateCommissionModal = () => {
    setUpdateCommissionModal(!updateCommissionModal);
  };

  const SingleData = (id) => {
    const datas = data.find((item) => item._id === id);
    setSingleData(datas);
  };
  const tableHeader = [
    "Company Name",
    "Commission Amount",
    "Commision percent",
    "Action",
  ];

  useEffect(() => {
    fecthCommissions(10, currentPage);
    fetchTransport()
  }, [currentPage]);

  useEffect(() => {
    onFilter();
  }, [searchQuery]);

  const tableRow = (data) => {
    return (
      <tr key={data?.id} className="border-b-2 border-slate-200">
        <td>{data?.company.name}</td>
        <td>{data?.amount}</td>
        <td>{data?.percentage}%</td>
        <td>
          <DropDown
            links={[
              {
                name: "Edit Commission",
                isLink: false,
                onclick: () => {
                  setCommisionId(data?._id);
                  setCompanyId(data?.company?._id)
                  SingleData(data?._id);
                  toggleUpdateCommissionModal();
                },
                link: "",
                icon: "edit",
              },
              {
                name: "Delete Commission",
                isLink: false,
                onclick: () => {
                  setCommisionId(data?._id);
                  toggleDeleteCommissionModal();
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
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> */}
          
          <div className="flex items-center justify-between mb-6">
          <h4>Commission page</h4>
          <button
            className="px-4 py-2 text-white transition-shadow rounded-md shadow-md hover:shadow-lg w-52 bg-sky-800"
            onClick={toggleAddCommissionModal}
          >
            Add Commission
          </button>
        </div>
          
      </section>

      <section className="mt-10 ">
        <div className="col-12">
          <Card description={"Manage transport Pricing"} width="w-full">
            <div className="items-center justify-between w-full mt-4 md:flex">
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
      <UpdateCommissionModal
        show={updateCommissionModal}
        size="md"
        onHide={toggleUpdateCommissionModal}
        data={Singledatas}
        commissionId={commissionId}
        companyId={companyId}
        callBack={fecthCommissions}
      >
      </UpdateCommissionModal>
      <DeleteCommissionModal
        show={deleteCommissionModal}
        size="md"
        onHide={toggleDeleteCommissionModal}
        id={commissionId}
        callBack={fecthCommissions}
      >
      </DeleteCommissionModal>
      <AddCommissionModal
        show={addCommissionModal}
        size="md"
        onHide={toggleAddCommissionModal}
        companies={companies}
        callBack={fecthCommissions}
      >
      </AddCommissionModal>
    </Page>
  );
};

export default AdminPricing;
