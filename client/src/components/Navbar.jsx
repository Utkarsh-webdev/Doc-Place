import React from 'react'
import {assets} from "../assets/assets_frontend/assets"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-5 mb-5 border-b border-gray-300">
        <img className="w-32 cursor-pointer" src={assets.logo} alt="" />
        <ul className="hidden md:flex items-start gap-5 font-medium">
            <NavLink to='/'>
              <li className='py-1'>Home</li>
              <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors'>
              <li className='py-1'>All Doctors</li>
              <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
              <li className='py-1'>About</li>
              <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
              <li className='py-1'>Contact</li>
              <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className=''>
          <button className="bg-blue-500 text-white px-8 py-2 rounded-full font-middum hidden md:inline-block">
            Create account
          </button>
        </div>
    </div>
  )
}

export default Navbar