import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar';

const Homelayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Homelayout;