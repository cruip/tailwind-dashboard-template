import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../services/authService";
import { AuthContext } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getToken } from "../utils/Utils";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = () => {
    Auth({ ...values })
      .then((r) => {
        setIsLoading(true);
        context.login(r.data);
        localStorage.setItem("token", r?.data?.authenticate.token.accessToken);
        localStorage.setItem("userData", JSON.stringify(r?.data));
        setTimeout(() => {
          navigate(state?.path || "/", { replace: true });
        }, 300);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("oops something went wrong");
      });
  };

  useEffect(() => {
    if (getToken()) {
      console.log(getToken(), "sup");
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <ToastContainer />
      <div className="w-full max-w-xs mx-auto">
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="dryvafrica@dryvafrica.com"
              value={values.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={values.password}
              onChange={handleInputChange}
              name="password"
            />
            {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleSubmit()}
            >
              {isLoading ? "Loading..." : " Sign In"}
            </button>
            <a
              className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-xs text-center text-gray-500">
          &copy;{new Date().getFullYear()} DryvAfrica. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default Login;
