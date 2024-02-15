import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import "./App.css";
import { useContext, useEffect } from "react";
import { userContext } from "./Context/UserContext";
import { getUser } from "./api/user";
import UnProtectedRoutes from "./components/UnProtectedRoutes";
import LoggedInHome from "./pages/LoggedInHome";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateTodo from "./pages/CreateTodo";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ViewTodo from "./pages/ViewTodo";

function App() {
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser();

        // Check if res.data and res.data.user are defined before accessing properties
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          // Handle the case where data or user is not defined
          console.error("Data or user not available in response:", res);
        }
      } catch (error) {
        // Handle errors during the API call
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [setUser]);

  return (
    <div className="App bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            user._id ? (
              <Navigate to={"/loggedin"} replace />
            ) : (
              <Navigate to={"/loggedout"} replace />
            )
          }
        />
        <Route path="/loggedin" element={<LoggedInHome />} />
        <Route
          path="/loggedout"
          element={
            <UnProtectedRoutes loggedIn={user._id ? true : false}>
              <Home />
            </UnProtectedRoutes>
          }
        />
        {/* <Route
            path="/"
            element={ user || user._id ? <LoggedInHome /> : <Home />}
          />
          Add more routes as needed 
          Catch-all route for unknown routes 
          */}
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route
          path="/user/register"
          element={
            <UnProtectedRoutes loggedIn={user._id ? true : false}>
              <Register />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/user/login"
          element={
            <UnProtectedRoutes loggedIn={user._id ? true : false}>
              <Login />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/todo/create"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <CreateTodo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/update/profile"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdateProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/update/password"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdatePassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/view/todo/:id"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <ViewTodo />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
