import React from "react";
import { Empty} from "./empty";
import { SVGIcon } from "../icons/SvgIcon";
import Loader from "../Loader";

export const Table = ({
  data,
  onExport,
  headers,
  rowFormat,
  emptyMessage,
  totalPages,
  onChangePageLimit,
  onPrev,
  onNext,
  currentPage,
  loading,
  loadingText,
  paginated,
  limit,
  searchTerm,
}) => {
  console.log(data, totalPages, currentPage, paginated, 'table');
  
  return (
    <>
      <div className="flex justify-between w-full overflow-x-auto">
        {onExport ? (
          <div className=" columns-12">
            <button onClick={onExport} className="btn btn-sm btn-primary">
              Export List
            </button>
          </div>
        ) : null}

        {/*<div className="col-sm-12 col-md-8">&nbsp;</div>*/}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data?.length ? (
            <>
              <table className="w-full bg-white shadow-lg table-auto">
                <thead>
                  <tr className="text-left bg-slate-200">
                    {headers?.length
                      ? headers.map((h, i) => {
                          return <th className="py-3" key={i}>{h}</th>;
                        })
                      : null}
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => {
                    return rowFormat(d, i);
                  })}
                </tbody>
              </table>
            </>
          ) : <Empty message={emptyMessage} />}

          {/* {!data?.length ? <Empty message={emptyMessage} /> : null} */}
          {paginated ? (
            <Pagination
              limit={limit}
              onChangePageLimit={onChangePageLimit}
              totalPages={totalPages}
              onPrev={onPrev}
              onNext={onNext}
              currentPage={currentPage}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export const Pagination = ({
  limit,
  currentPage,
  onPrev,
  totalPages,
  onNext,
  onChangePageLimit,
}) => {
  return (
    <>
      <div className="pagination pagination-right">
        <ul className="pagination rounded-separated pagination-danger">
          <li>
            {currentPage && currentPage > 1 && (
              <span className="flex items-center text-teal-700 cursor-pointer" onClick={() => onPrev && onPrev()}>
                 <SVGIcon name="arrow-left" />
                &nbsp; Prev
              </span>
            )}
          </li>
          <li className="text-teal-700 page-item">{currentPage}</li>
          <li className="text-teal-700 page-item"> &nbsp;of&nbsp;{totalPages}&nbsp;</li>
          <li>
            {currentPage !== totalPages && (
              <>
                <span className="flex items-center text-teal-700 cursor-pointer" onClick={() => onNext && onNext()}>
                  Next&nbsp;
                  <SVGIcon name="arrow-right" />
                </span>
              </>
            )}
          </li>
          {onChangePageLimit ? (
            <li>
              <select
                name="limit"
                onChange={onChangePageLimit}
                className="page-limit"
                value={limit}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </select>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};