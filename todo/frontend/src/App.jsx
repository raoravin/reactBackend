import { Route, Routes, } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import './App.css';
import { useContext, useEffect } from 'react';
import { userContext } from './Context/UserContext';
import { getUser } from './api/user';
import UnProtectedRoutes from './components/UnProtectedRoutes';
import LoggedInHome from './pages/LoggedInHome';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateTodo from "./pages/CreateTodo"
import UpdateProfile from "./pages/UpdateProfile"
import UpdatePassword from './pages/UpdatePassword';

function App() {
  const {user, setUser} = useContext(userContext);

  useEffect(() => {
      const fetchData = async () => {
      const res = await getUser();
      setUser(res.data?.user);
    };

    fetchData();
  },[])

  return (
    <div className="App bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Navbar />
      <Routes>
        <Route exact path="/" element={user?._id ? <LoggedInHome /> : <Home />} />
        <Route path="/user/register" element={
          <UnProtectedRoutes loggedIn={user?._id ? true : false}>
            <Register />
          </UnProtectedRoutes>
        } />
        <Route path="/user/login" element={
          <UnProtectedRoutes loggedIn={user?._id ? true : false}>
          <Login />
        </UnProtectedRoutes>
        } />
        <Route path="/user/profile" element={ 
          <ProtectedRoutes loggedIn={user?._id ? true : false}>
            <Profile />
          </ProtectedRoutes>
        } />
        <Route path="/todo/create" element={ 
          <ProtectedRoutes loggedIn={user?._id ? true : false}>
            <CreateTodo />
          </ProtectedRoutes>
        } />
        <Route path="/user/update/profile" element={ 
          <ProtectedRoutes loggedIn={user?._id ? true : false}>
            <UpdateProfile />
          </ProtectedRoutes>
        } />
        <Route path="/user/update/password" element={ 
          <ProtectedRoutes loggedIn={user?._id ? true : false}>
            <UpdatePassword />
          </ProtectedRoutes>
        } /> 
      </Routes>
    </div>
  )   
}

export default App
