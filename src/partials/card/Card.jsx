import React from "react";


export const Card= ({ name, description, children, width }) => {
    return (
      <div className={`${width? width : 'max-w-5xl'} transition ease-in-out px-10 overflow-auto rounded-md shadow-lg hover:shadow-xl cursor-pointer bg-slate-50 py-7`} >
        <div className="w-full ">
         {name &&  <h4 className="mb-4 text-2xl font-bold text-blue-800">{name}</h4>}
          {description && <p className="text-lg font-medium text-black "> {description}</p>}
          {children}
        </div>
      </div>
    );
  };