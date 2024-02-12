import React, { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { delteUser, logout } from "../api/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation()
  // console.log(location.pathname);
  // console.log(window.location);

  const logoutHandler = async (e) => {
    e.preventDefault();

    const response = await logout();
    if (response.statusText === "OK") {
      toast.success(response.data.message, {
        autoClose: 3000,
      });
      setUser({});
      navigate("/");
    } else {
      toast.error(response.response.data.errors[0].msg, {
        autoClose: 3000,
      });
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm("Are you sure you want to delete your account?");

    if (userConfirmed) {
      const response = await delteUser();

      if (response.statusText === "OK") {
        toast.success(response.data.message, {
          autoClose: 3000,
        });
        setUser({});
        navigate("/");
      } else {
        toast.error(response.response.data?.errors[0]?.msg, {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className=" w-1/4 m-auto text-center">
      <h1 className=" text-3xl my-3 font-bold">Profile</h1>
      <div className="mt-3">
        <h2 className=" text-2xl">Name: {user?.name}</h2>
        <h2 className="text-2xl">Email: {user?.email}</h2>
        <h2 className="text-2xl">Age: {user?.age}</h2>
      </div>
      <div className="mt-3">
        <button
          onClick={() => navigate("/user/update/profile")}
          className=" my-2 bg-yellow-600 text-white w-full py-2 rounded"
        >
          Update Profile
        </button>
        <button
          onClick={() => navigate("/user/update/password")}
          className=" my-2 bg-blue-600 text-white w-full py-2 rounded"
        >
          Update Password
        </button>
        <button
          onClick={logoutHandler}
          className=" my-2 bg-red-500 text-white w-full py-2 rounded"
        >
          Logout
        </button>
        <button 
        onClick={deleteHandler}
        className=" my-2 bg-red-700 text-white w-full py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
