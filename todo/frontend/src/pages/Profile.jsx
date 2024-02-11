import React, { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/user";

const Profile = () => {

  const {user, setUser} = useContext(userContext);
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();

    const response = await logout();
    if (response.status === 200) {
      alert("User logged out");
      setUser({});
      navigate("/user/login");
    } else {
      alert(response.response.data.message);
    }
  }


  return (
    <div className=" w-1/4 m-auto text-center">
      <h1 className=" text-3xl my-3 font-bold">Profile</h1>
      <div className="mt-3">
        <h2 className=" text-2xl">Name: {user?.name}</h2>
        <h2 className="text-2xl">Email: {user?.email}</h2>
        <h2 className="text-2xl">Age: {user?.age}</h2>
      </div>
      <div className="mt-3">
        <button onClick={() =>  navigate("/user/update/profile")} className=" my-2 bg-yellow-600 text-white w-full py-2 rounded">
          Update Profile
        </button>
        <button onClick={() =>  navigate("/user/update/password")} className=" my-2 bg-blue-600 text-white w-full py-2 rounded">
          Update Password
        </button>
        <button onClick={logoutHandler} className=" my-2 bg-red-500 text-white w-full py-2 rounded">
          Logout
        </button>
        <button className=" my-2 bg-red-700 text-white w-full py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
