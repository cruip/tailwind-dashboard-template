import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_LOGIN } from "../services/authService";
import { AuthContext } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state, 'state');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [login, { loading, error, data }] = useLazyQuery(GET_LOGIN);
  // console.log(loading, error, data, 'auth');
  const handleSubmit = () => {
    login({ variables: { ...values } });
    if (data?.authenticate.token) {
      context.login(data);
      setTimeout(() => {
        navigate(state?.path || "/", { replace: true });
      }, 500);
    }
  };

  return (
    <main>
      <section className="flex items-center justify-center w-full h-screen px-4 py-8 mx-auto my-auto sm:px-6 lg:px-8 max-w-9xl">
        <div className="w-full p-3 mx-auto bg-white rounded-lg shadow-lg form md:w-5/6 lg:w-2/4 ">
          <h2 className="text-xl font-medium text-slate-700">Login As Admin</h2>
          <div className="mt-7 form-group">
            <input
              type="email"
              id=""
              className="w-full border-2 rounded-md border-slate-400"
              placeholder="user@gamil.com"
              value={values.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="mt-7 form-group">
            <input
              type="password"
              id=""
              className="w-full border-2 rounded-md border-slate-400"
              placeholder="password"
              value={values.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>
          <div className="flex items-center justify-center mb-4 text-center mt-7 form-group">
            <button
              className="flex items-center justify-center w-48 py-3 font-medium text-white bg-indigo-700 rounded-lg shadow-md"
              onClick={() => handleSubmit()}
            >
              Log In
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
