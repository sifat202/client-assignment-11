import React, { useEffect, useState } from 'react';
import { TbReportMedical, TbReportSearch } from 'react-icons/tb';
import { Link, Outlet } from 'react-router';
import useAxiosSecure from '../../Hooks/api/api';
import useAuth from '../../Hooks/useAuth/useAuth';
import { GrUserWorker } from "react-icons/gr";
import { FaList, FaUser } from 'react-icons/fa';
const DashboardLayout = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
const [User, setDbUser] = useState(null);
useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/getuser/${user?.email}`)
        .then(res => {
          setDbUser(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user?.email, axiosSecure]);
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Dashboard</div>
    </nav>
    {/* Page content here */}
    <Outlet></Outlet>
    <div className="p-4"></div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <Link to={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
            </Link>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="profile">
            {/* Home icon */}
            <Link to={'/dashboard'}>
          <FaUser></FaUser>
            <span className="is-drawer-close:hidden">Homepage</span>
            </Link>
          </button>
        </li>

        {/* List item */}
        {User?.role=='admin' &&
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign staff">
            {/* Settings icon */}
            <Link to={'/dashboard/mkstaff'}>
            <GrUserWorker></GrUserWorker>
            <span className="is-drawer-close:hidden">Assign staff</span>
            </Link>
          </button>
        </li>}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report new issue">
            {/* Settings icon */}
            <Link to={'/dashboard/report'}>
            <TbReportMedical></TbReportMedical>
            <span className="is-drawer-close:hidden">Report new issue</span>
            </Link>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="issues">
            {/* Settings icon */}
            <Link to={'/dashboard/list'}>
            <FaList></FaList>
            <span className="is-drawer-close:hidden">issues</span>
            </Link>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My issues">
            {/* Settings icon */}
            <Link to={'/dashboard/myissues'}>
            <TbReportSearch></TbReportSearch>
            <span className="is-drawer-close:hidden">My issues</span>
            </Link>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
        </div>
    );
};

export default DashboardLayout;