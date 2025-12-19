import React from 'react'
import { NavLink } from 'react-router-dom'

 
 const Navbar = () => {
  const linkClass = ({ isActive }) =>
  `text-lg font-semibold transition-colors ${
    isActive ? "text-blue-500" : "text-gray-300"
  } hover:text-blue-400`;
   return (
     <div className='flex flex-row gap-4 justify-evenly p-4 bg-[#0f0f0f]'>
    <NavLink to = "/" end className='font-semibold text-blue-500 hover:text-blue-400'>
      Home
    </NavLink>

    <NavLink to = "/pastes" className='className="text-lg font-semibold text-blue-500 hover:text-blue-400'>
      Paste
    </NavLink>
     </div>

   )
 }
 
 export default Navbar