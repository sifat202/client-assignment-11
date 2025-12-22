import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/api/api';
import useAuth from '../../../Hooks/useAuth/useAuth';
import { Link } from 'react-router';

const Myissues = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: issues = [] } = useQuery({
        queryKey: ['my-issues', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-issues/${user.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <h1 className="text-2xl text-center mb-4">My Issues</h1>

            <div className="overflow-x-auto rounded-box border bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>priority</th>
                            <th>status</th>
                            <th>upvotes</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map(issue => (
                            <tr key={issue._id}>
                                <td>{issue._id.slice(0, 6)}...</td>
                                <td>{issue.title}</td>
                                <td>{issue.priority == 1? "normal" :'premium'}</td>
                                <td>{issue.status}</td>
                                <td>{issue.upvotes? issue.upvotes:0}</td>
                                <td>
                                    <button
                                        className="btn btn-sm bg-teal-500"
                                        
                                    >
                                        <Link to={`/details/${issue._id}`}>View details</Link>
                                        
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {issues.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No issues found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myissues;
