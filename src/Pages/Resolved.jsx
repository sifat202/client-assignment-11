import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/api/api';
import Issuecrdtwo from './allissues/secondcaard';

const Resolved = () => {
    const axiosSecure = useAxiosSecure();
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axiosSecure.get('/issues');
                setIssues(res.data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            } 
        };
        fetchIssues();
    }, [axiosSecure]);

    const show = issues.filter((item) => item.status === 'resolved' || item.status === 'closed');

    return (
        /* 1. Changed w-[1200px] to max-w-7xl and added w-full.
           2. Added px-4 for padding on mobile screens.
           3. Simplified the grid breakpoints for better flow.
        */
        <div className='mx-auto w-full max-w-7xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            
            {show.map((item) => (
                <Issuecrdtwo key={item._id} show={item}></Issuecrdtwo>
            ))}
        </div>
    );
};

export default Resolved;