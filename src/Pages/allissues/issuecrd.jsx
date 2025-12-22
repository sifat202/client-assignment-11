import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Issuecrd = ({ issue, refetchIssues }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleUpvote = async () => {
        toast.info('Wait 3 seconds bhaiya...', { autoClose: 3000 });

        try {
            await axiosSecure.patch(`/issues/upvote/${issue._id}`);
            refetchIssues();
        } catch (err) {
            console.error("Failed to upvote issue:", err);
            toast.error('Failed to upvote, try again!', { autoClose: 3000 });
        }
    };

    // Logic: Only show if status is NOT resolved AND NOT closed
    const canUpvote = issue?.status !== "resolved" && issue?.status !== "closed";

    return (
        <div className="card w-full md:w-80 bg-base-100 shadow-lg m-3 flex flex-col relative">
            <ToastContainer position="top-right" />

            <img src={issue?.photoURL} alt={issue?.title} className="h-48 w-full object-cover rounded-t-lg"/>
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold">{issue?.title}</h2>
                <p>Category: {issue?.issueType}</p>
                <p>Priority: {issue?.priority === 1 ? 'Normal' : 'High'}</p>
                <p>Upvotes: {issue?.upvotes || 0}</p>
                <p className="capitalize">Status: <span className="font-semibold">{issue?.status}</span></p>
                <p className="text-sm text-gray-500 truncate">Posted by: {issue?.reporterName}</p>
                
                <div className="flex justify-between mt-4">
                    {canUpvote ? (
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={handleUpvote}
                        >
                            Upvote
                        </button>
                    ) : (
                        <div className="text-xs text-gray-400 italic flex items-center">
                            Voting Closed
                        </div>
                    )}
                    
                    <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => navigate(`/details/${issue._id}`)}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Issuecrd;