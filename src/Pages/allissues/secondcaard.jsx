import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Issuecrdtwo = ({ show }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    

    // Logic: Only show if status is NOT resolved AND NOT closed
    const canUpvote = show?.status !== "resolved" && show?.status !== "closed";

    return (
        <div className="card w-full md:w-80 bg-base-100 shadow-lg m-3 flex flex-col relative">
            <ToastContainer position="top-right" />

            <img src={show?.photoURL} alt={show?.title} className="h-48 w-full object-cover rounded-t-lg"/>
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold">{show?.title}</h2>
                <p>Category: {show?.issueType}</p>
                <p>Priority: {show?.priority === 1 ? 'Normal' : 'High'}</p>
                <p>Upvotes: {show?.upvotes || 0}</p>
                <p className="capitalize">Status: <span className="font-semibold">{show?.status}</span></p>
                <p className="text-sm text-gray-500 truncate">Posted by: {show?.reporterName}</p>
                
                <div className="flex justify-between mt-4">
                  
                  
                    
                    <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => navigate(`/details/${show._id}`)}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Issuecrdtwo;