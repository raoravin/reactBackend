import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { userContext } from '../Context/UserContext';





const Navbar = () => {
  const {user, setUser} = useContext(userContext)
  return (
    <nav className="bg-black py-3 text-white flex justify-between items-center">
      <h1 className='ml-1 font-bold text-2xl'>Todo App</h1>
      {
        user?._id
         ? 
        <ul className='flex'> 
        <li className='mr-3'><Link className=' hover:text-pink-500' to="/">Home</Link></li>
        <li className='mr-3'><Link className=' hover:text-pink-500' to="/todo/create">Create Todo</Link></li>
        <li className='mr-3'><Link className=' hover:text-pink-500' to="/user/profile">Profile</Link></li>
      </ul> 
      :
      <ul className='flex'> 
      <li className='mr-3'><Link className=' hover:text-pink-500' to="/user/register">Register</Link></li>
      <li className='mr-3'><Link className=' hover:text-pink-500' to="/user/login">Login</Link></li>
    </ul>
      }
    </nav>
  )
}

export default Navbar;