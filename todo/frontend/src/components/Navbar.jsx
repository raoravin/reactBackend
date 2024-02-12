import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { userContext } from '../Context/UserContext';





const Navbar = () => {
  const {user, setUser} = useContext(userContext)
  return (
    <nav className=" bg-gradient-to-r from-teal-400 from-10% via-amber-500 via-30% to-orange-100 to-90% py-3 text-white flex justify-between items-center">
      <h1 className='ml-1 font-bold text-2xl'>Todo App</h1>
      {
        user?._id
         ? 
        <ul className='flex'> 
        <li className='mr-3'><Link className=' hover:text-pink-500 text-black' to="/">Home</Link></li>
        <li className='mr-3'><Link className=' hover:text-pink-500 text-black' to="/todo/create">Create Todo</Link></li>
        <li className='mr-3'><Link className=' hover:text-pink-500 text-black' to="/user/profile">Profile</Link></li>
      </ul> 
      :
      <ul className='flex gap-3'> 
      <li className='mr-3 bg-green-600 p-2 rounded-md text-black'><Link to="/user/register">Register</Link></li>
      <li className='mr-3 bg-green-600 p-2 px-4 rounded-md text-black'><Link to="/user/login">Login</Link></li>
    </ul>
      }
    </nav>
  )
}

export default Navbar;