import React from 'react';
import logo from '../../assets/piirslogo.png'
import { NavLink } from 'react-router';
const Navbar = () => {
const smartlink = <>
<NavLink to="/" className={({isActive})=>
isActive 
?"border-b-2 border-black text-lg mx-1 font-semibold": "hover:border-b hover:border-gray-400 text-lg mx-1"
    }>

        Home
    </NavLink>
<NavLink to="/e" className={({isActive})=>
isActive 
?"border-b-2 border-black font-semibold text-lg mx-1": "hover:border-b hover:border-gray-400 text-lg mx-1"
    }>

        Tutorial
    </NavLink>
<NavLink to="/r" className={({isActive})=>
isActive 
?"border-b-2 border-black   text-lg mx-1 font-semibold": "hover:border-b  text-lg mx-1 hover:border-gray-400"
    }>

        Be premium
    </NavLink>
</>

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {smartlink}
      </ul>
    </div>
    <a className=""><img src={logo} className='rounded-full w-13' alt="" /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {smartlink}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;