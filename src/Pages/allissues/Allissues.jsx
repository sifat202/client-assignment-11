import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/api/api';
import Issuecrd from './issuecrd';

const Allissues = () => {
    const axiosSecure = useAxiosSecure();
    const [sortBy, setSortBy] = useState('priority'); // default sort

    const { data: issues = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center mt-10">Loading issues...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load issues.</p>;

    // Sorting function
    const sortedIssues = [...issues].sort((a, b) => {
        switch(sortBy) {
            case 'priority':
                // High priority first
                return (b.priority || 0) - (a.priority || 0);

            case 'status':
                const statusOrder = ['pending', 'in-progress', 'resolved', 'closed']; // FIXED: quotes around in-progress
                return statusOrder.indexOf(a.status.toLowerCase()) - statusOrder.indexOf(b.status.toLowerCase());

            case 'upvotes':
                return (b.upvotes || 0) - (a.upvotes || 0);

            case 'date':
                return new Date(b.createdAt) - new Date(a.createdAt);

            default:
                return 0;
        }
    });

    return (
        <div className="px-4 py-10">
            <h1 className="text-4xl text-teal-500 mb-6 text-center">All Issues</h1>

            {/* Sort Dropdown */}
            <div className="mb-6 text-center">
                <label className="mr-2 font-semibold">Sort by:</label>
                <select
                    className="select select-bordered w-40"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="priority">Priority (High → Normal)</option>
                    <option value="status">Status (Pending → Closed)</option>
                    <option value="upvotes">Upvotes (High → Low)</option>
                    <option value="date">Report Date (Newest → Oldest)</option>
                </select>
            </div>

            <div className="flex flex-wrap justify-center">
                {sortedIssues.map(issue => (
                    <Issuecrd key={issue._id} issue={issue} refetchIssues={refetch} />
                ))}
            </div>
        </div>
    );
};

export default Allissues;
