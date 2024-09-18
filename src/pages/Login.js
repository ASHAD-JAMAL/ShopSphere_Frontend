import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common/index";
import {toast} from "react-toastify"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dataResponse = await fetch(summaryApi.signIn.url,{
      method: summaryApi.signIn.method,
      headers:{
        "Content-type":"application/json",
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json();
    if(dataApi.success){
      toast.success(dataApi.message);
      navigate("/");
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  };
  console.log("login details", data);

  return (
    <>
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-white p-5 py-5 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto">
              <img src={loginIcons} alt="login icons" />
            </div>
            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label>Email:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid">
                <label>Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="block w-fit ml-auto hover:underline hover:text-[#f16565]"
                >
                  Forgot Password
                </Link>
              </div>
              <button className="bg-[#f16565] text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition mx-auto block mt-6">
                Login
              </button>
            </form>
            <p className="my-5">
              Don't have account?{" "}
              <Link
                to={"/sign-up"}
                className="hover:text-[#f16565] hover:underline"
              >
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
