import React, { useEffect, useState } from 'react';
import logo from '../../assets/piirslogo.png'
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth/useAuth';
import { FaCrown } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/api/api';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure()
  const [User, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/getuser/${user?.email}`)
        .then(res => {
          setDbUser(res.data);
          console.log([res.data])
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user?.email, axiosSecure]);

  const loginbtn = (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className='btn bg-green-600 h-18 py-1 px-2 text-white hover:bg-green-700 text-lg font-semibold border-none'
          >
            <div className="flex gap-2 items-center">
              <div className="flex flex-col text-center justify-center">
                {User?.userStatus=="premium" && <div className="mx-auto">
                  <FaCrown ></FaCrown>

                </div>}
                <img
                  src={`${user?.photoURL}`}
                  className='w-13 h-13 rounded-full border-2 border-gray-600 object-cover'
                  alt="User Avatar"
                />

              </div>
              <h1 className="font-semibold text-lg">Options</h1>
            </div>
          </div>

          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box p-3">
            <li className='btn h-12 w-37'>
              <Link to="/dashboard">
                <h1 className="text-md font-bold text-gray-800">dashboard</h1>
              </Link>
            </li>
            <li className='btn h-12 w-37'>
              <div className="flex items-center">
                <h1 className="text-md font-bold flex text-gray-800">H1 👋 {user?.displayName}</h1>
              </div>
            </li>
            <li className='btn h-12 w-37'>
              <a onClick={logOut}>
                <h1 className="text-md font-bold text-red-600">Logout</h1>
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <button className='btn bg-green-600 text-white hover:bg-green-700 text-lg font-semibold'>
          <Link to={"/login"}>Login</Link>
        </button>
      )}
    </>
  );

  const smartlink = <>
    <NavLink to="/" className={({ isActive }) =>
      isActive ? "border-b-2 border-black text-lg mx-1 font-semibold" : "hover:border-b hover:border-gray-400 text-lg mx-1"
    }>
      Home
    </NavLink>
    <NavLink to="/e" className={({ isActive }) =>
      isActive ? "border-b-2 border-black font-semibold text-lg mx-1" : "hover:border-b hover:border-gray-400 text-lg mx-1"
    }>
      Tutorial
    </NavLink>
    {/* <NavLink to="/premium" className={({ isActive }) =>
      isActive ? "border-b-2 border-black text-lg mx-1 font-semibold" : "hover:border-b text-lg mx-1 hover:border-gray-400"
    }>
      <div className="items-center gap-2 flex">
        Be premium <FaCrown></FaCrown>
      </div>
    </NavLink> */}
  </>

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {smartlink}
            </ul>
          </div>
          <a><img src={logo} className='rounded-full w-13' alt="" /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {smartlink}
          </ul>
        </div>
        <div className="navbar-end">
          {loginbtn}
        </div>
      </div>
    </div>
  );
};

export default Navbar;