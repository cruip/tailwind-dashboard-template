import React from "react";

export const Empty = ({ message,icon }) => {
  return <div className='d-flex w-100 flex-column justify-content-center align-items-center'>
   {icon &&  <div className='mb-2'>{icon}</div>}
    <h3>{message}</h3>
  </div>;
};