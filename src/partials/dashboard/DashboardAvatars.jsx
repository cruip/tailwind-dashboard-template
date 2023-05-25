import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import User01 from '../../images/user-36-01.jpg';
import User02 from '../../images/user-36-02.jpg';
import User03 from '../../images/user-36-03.jpg';
import User04 from '../../images/user-36-04.jpg';

function DashboardAvatars({companies}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/transport_companies");
  }
  return (
    <ul className="flex flex-wrap justify-center mb-8 -ml-px -space-x-3 sm:justify-start sm:mb-0">
      {
        companies?.length && (
          companies.map((el) => (
            <li key={el?._id}>
            <Link className="block" to="#0">
              <img className="rounded-full w-9 h-9" src={el?.logo} width="36" height="36" alt="User 01" />
            </Link>
          </li>
          ))
        )
      }
     
      <li>
        <button onClick={handleClick} className="flex items-center justify-center ml-2 text-indigo-500 transition duration-150 bg-white border rounded-full shadow-sm w-9 h-9 border-slate-200 hover:border-slate-300">
          <span className="sr-only">Add new transport company</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
        </button>
      </li>
    </ul>
  );
}

export default DashboardAvatars;
