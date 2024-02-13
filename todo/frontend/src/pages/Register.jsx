import React, { useContext } from "react";
import { useState } from "react";
import { register } from "../api/user.js";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  // State to track the checkbox status
  const [terms, setTerms] = useState(false);

  // Handler function for the checkbox change event
  const handleCheckboxChange = () => {
    // Update the state based on the current state
    setTerms(!terms);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.warn("Password does not match", {
        autoClose: 3000,
      });
      return;
    }
    if (!terms) {  // Fix: Check if terms checkbox is not checked
      toast.warn("Please accept the terms and conditions", {
        autoClose: 3000,
      });
      return;
    }

    const data = {
      name,
      email,
      age,
      password,
      terms,
    };

    const response = await register(data);
    if (response.status === 202) {
      toast.success(response.data.message, {
        autoClose: 3000,
      });
      setUser(response.data.user);
      navigate("/");
    } else {
     
      toast.error(response.response.data.message, {
        autoClose: 3000,
      });
       toast.warn(response?.response?.data?.errors[0]?.msg, {
        autoClose: 3000,
      });
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword((prev) => !prev);
  };

  const handleAgeChange = (e) => {
    // Ensure the entered value is less than or equal to 100
    const newAge = e.target.value;
    if (newAge === '' || (parseInt(newAge, 10) <= 100 && parseInt(newAge, 10) >= 0)) {
      setAge(newAge);
    }else {
      toast.warn("Age not > 100", {
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-16 ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-4"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-10 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter your name"
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm my-2 font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={age}
                  onChange={handleAgeChange}
                />
              </div>
              <div className=" flex gap-4 py-2">
                <div className=" relative">
                  <label
                    htmlFor="password"
                    className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ?  "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <a
                  className="absolute right-3 top-1/2 mt-2 text-xl"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}{" "}
                </a>
                </div>
                <div className="relative">
                  <label
                    htmlFor="cfPassword"
                    className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    confirmPassword
                  </label>
                  <input
                    type={showCPassword ?  "text" : "password"}
                    name="cfPassword"
                    id="cfPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    placeholder="••••••••"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <a
                  className="absolute right-3 top-1/2 mt-2 text-xl"
                  onClick={toggleCPasswordVisibility}
                >
                  {showCPassword ? <LuEye /> : <LuEyeOff />}{" "}
                </a>
                </div>
              </div>
              <div className="flex my-2 items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required=""
                    checked={terms}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-2 text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light mt-3 text-gray-500 dark:text-gray-400">
                Already have an account?
                <a
                  href="#"
                  onClick={() => navigate("/user/login")}
                  className="text-blue-600 ms-1 font-medium underline dark:text-blue-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
