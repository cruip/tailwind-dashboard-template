import React from "react";
import Logo from "../images/logo-rsui-1.png";

function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
            <img src="https://source.unsplash.com/5fNmWej4tAA" className=" w-full h-screen object-cover" />
        </div>

        <div className="bg-slate-200 flex flex-col justify-center">
            <form className="max-w-[500px] w-full mx-auto bg-white border p-8 px-8 rounded-lg">
                <img src={Logo} className="h-24 w-64"/>
                
                <h2 className="text-2xl font-bold text-center text-blue-900 my-8">Login Dashboard Revenue</h2>
                <div className="flex flex-col py-2">
                    <label className="text-blue-900 font-semibold">Username</label>
                    <input type="text" placeholder="Input Username" className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none placeholder-gray-300"/>
                </div>
                <div className="flex flex-col py-2">
                    <label className="text-blue-900 font-semibold">Password</label>
                    <input type="password" placeholder="Input Password" className="rounded-lg mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none placeholder-gray-300"/>
                </div>
                <div className="flex justify-between py-2">
                    <p className="flex items-center text-center text-sm">Forgot Password? Please kindly to contact website administration.</p>
                </div>
                <input type="submit" value="Login" className="w-full my-5 py-2 bg-blue-800 shadow-lg shadow-blue-800/50 hover:shadow-blue-800/70 text-white font-semibold rounded-lg cursor-pointer" />
            </form>
        </div>
    </div>
  );
}
export default Login;