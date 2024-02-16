import React, { useState } from "react";
import { updatePassword } from "../api/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      password: oldPassword,
      newPassword: password,
    };

    // console.log(data);

    const response = await updatePassword(data);
    if (response.statusText === "OK") {
      toast.success(response.data.message, {
        autoClose: 3000,
      });
      navigate("/user/profile");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } else {
      toast.error(response.response.data.errors[0].msg, {
        autoClose: 3000,
      });
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword((prev) => !prev);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center  px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mt-10 mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Your Password
            </h1>
            <form onSubmit={submitHandler}>
              <div className=" relative">
                <label
                  htmlFor="oldpassword"
                  className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  oldPassword
                </label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldpassword"
                  id="oldpassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <a
                  className="absolute right-3 top-1/2 mt-1 text-xl"
                  onClick={toggleOldPasswordVisibility}
                >
                  {showOldPassword ? <LuEye /> : <LuEyeOff />}
                </a>
              </div>

              <div className=" relative">
                <label
                  htmlFor="password"
                  className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  newPassword
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  className="absolute right-3 top-1/2 mt-1 text-xl"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}{" "}
                </a>
              </div>
              <div className=" relative">
                <label
                  htmlFor="cfPassword"
                  className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  confirmNewPassword
                </label>
                <input
                  type={showCPassword ? "text" : "password"}
                  name="cfPassword"
                  id="cfPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="••••••••"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <a
                  className="absolute right-3 top-1/2 mt-1 text-xl"
                  onClick={toggleCPasswordVisibility}
                >
                  {showCPassword ? <LuEye /> : <LuEyeOff />}{" "}
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-6 text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
