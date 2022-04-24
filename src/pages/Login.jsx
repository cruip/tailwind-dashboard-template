import React from "react";
import Logo from "../images/logo-rsui-1.png";
import loginImg from "../images/login.svg";
// import rightImgBg from "../images/login-bc.svg";
// import rightImgChart from "../images/login-gambar.svg";

function Login() {
  return (
    <div className="grid font-gilroy grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
            <img src={loginImg} className=" w-full h-screen object-cover"  />
        </div>

        <div className="bg-white flex flex-col justify-center">
            <form className="max-w-[500px] w-full mx-auto bg-white border-2 shadow p-8 px-8 rounded-lg">
                <center><img src={Logo} className="h-full w-64"/></center>
                
                <h2 className="text-2xl font-bold text-center text-primary-900 my-8">Login Dashboard Revenue</h2>
                <div className="flex flex-col py-2">
                    <label className="text-primary-900 font-semibold">Username</label>
                    <input type="text" placeholder="Input username" className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none placeholder-gray-300"/>
                </div>
                <div className="flex flex-col py-2">
                    <label className="text-primary-900 font-semibold">Password</label>
                    <input type="password" placeholder="Input password" className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none placeholder-gray-300"/>
                </div>
                <div className="flex justify-between py-2">
                    <p className="flex items-center text-center font-medium text-sm">Forgot Username / Password? Please kindly contact website administration.</p>
                </div>
                <input type="submit" value="Login" className="w-full my-5 py-2 bg-primary-700 shadow-lg shadow-blue-800/50 hover:shadow-blue-800/70 text-white font-semibold rounded-lg cursor-pointer" />
            </form>
        </div>
    </div>
  );
}
export default Login;