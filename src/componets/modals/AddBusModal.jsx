import React, { useState, useEffect } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addBus } from "../../services/busService";

export const AddBusModal = ({ show, onHide, callBack, id, name }) => {
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [values, setValues] = useState({
    vehicleNo: "",
    vehicleModel: "",
    vehicleBrand: "",
    numberOfSeats: 14,
    status: "true",
    // transporterId: 'guo',
    // terminals: datas?.terminals || '629cb14b66e7a3bcc6f7212c'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const uploadImage = (files) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "wni0bhqi");
    data.append("cloud_name", "dryvafrica");
    fetch("  https://api.cloudinary.com/v1_1/dryvafrica/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLogoUrl(data.url);
      });
  };

  const handleCreateTranport = () => {
    if (Object.values(values).some((o) => o === "") && !logoUrl) return false;
    setSaving(!saving);
    // setTimeout(() => {
      addBus({ ...values, status: true, busImage: logoUrl, transporter: id })
        .then(async () => {
          toast.success("Bus added successfully");
          await callBack();
          
          setLogoUrl(null);
          onHide()
        })
        .catch(() => toast.error("Oops! something went wrong"));
    // }, 2000);
    setSaving(!saving);
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide}>
        <p>Add Bus to {name}</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="vehicle"
            >
              Vehicle Number
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="vehicle"
              type="text"
              placeholder="ENU-190"
              value={values.vehicleNo}
              onChange={handleInputChange}
              name="vehicleNo"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="logo"
            >
               Vehicle Image
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="logo"
              type="file"
              placeholder="paste logo url"
              onChange={(e) => uploadImage(e.target.files)}
              name="logo"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="model"
            >
             Vehicle Model
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="model"
              type="text"
              placeholder="01934EC"
              value={values.vehicleModel}
              onChange={handleInputChange}
              name="vehicleModel"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="vehicleBrand"
            >
              Vehicle Brand
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="vehicleBrand"
              type="text"
              placeholder="Toyota"
              value={values.vehicleBrand}
              onChange={handleInputChange}
              name="vehicleBrand"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="numberOfSeats"
            >
             Number of Seat
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="numberOfSeats"
              type="number"
              placeholder="numberOfSeats"
              value={values.numberOfSeats}
              onChange={handleInputChange}
              name="numberOfSeats"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="status"
            >
              company status
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.status || "true"}
              onChange={handleInputChange}
              name="status"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleCreateTranport()}
          >
            {saving ? "Saving..." : "Add"}
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onHide}
          >
            close
          </button>
        </div>
      </Modal>
    </>
  );
};
