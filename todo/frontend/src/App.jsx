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

function App() {
  const {user, setUser} = useContext(userContext);

  useEffect(() => {
      const fetchData = async () => {
      const res = await getUser();
      // console.log(res);
      setUser(res.data?.user);
    };

    fetchData();
  },[])

  return (
    <div className="App bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/profile" element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App
