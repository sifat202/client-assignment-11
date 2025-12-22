import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/api/api';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth/useAuth';

const List = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const [modalOpen, setModalOpen] = useState(false);
    const [changerOpen, setChangerOpen] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [changeIssueId, setChangeIssueId] = useState(null);
    const [User, setDbUser] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/getuser/${user.email}`)
                .then(res => setDbUser(res.data));
        }
    }, [user?.email, axiosSecure]);

    const { data: issues = [] } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues');
            return res.data;
        }
    });

    const { data: stafflist = [] } = useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staff');
            return res.data;
        }
    });

    const openAssignModal = (id) => {
        setSelectedIssueId(id);
        setModalOpen(true);
    };

    const assignStaff = async (email) => {
        await axiosSecure.patch(`/assign/${email}/${selectedIssueId}`);
        queryClient.invalidateQueries(['issues']);
        setModalOpen(false);
        Swal.fire({
            icon: 'success',
            title: 'Assigned',
            timer: 1200,
            showConfirmButton: false
        });
    };

    const deleteIssue = async (id) => {
        const res = await Swal.fire({
            title: 'Reject issue?',
            showCancelButton: true
        });
        if (res.isConfirmed) {
            await axiosSecure.patch(`/issues/reject/${id}`);
            queryClient.invalidateQueries(['issues']);
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                timer: 1200,
                showConfirmButton: false
            });
        }
    };

    const openChanger = (id) => {
        setChangeIssueId(id);
        setChangerOpen(true);
    };

    const statusChangerFunction = async (status) => {
        await axiosSecure.patch(`/issues/status/${changeIssueId}`, { status });
        queryClient.invalidateQueries(['issues']);
        setChangerOpen(false);
        Swal.fire({
            icon: 'success',
            title: 'Status Updated',
            timer: 1000,
            showConfirmButton: false
        });
    };

    return (
        <div>
            <h1 className="text-3xl text-teal-600 mb-4">All Issues</h1>

            <div className="overflow-x-auto rounded-box border bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Citizen</th>
                            <th>Email</th>
                            <th>Priority</th>
                            <th>Upvote</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issues.map(issue => (
                            <tr key={issue._id}>
                                <td>{issue._id.slice(0, 6)}...</td>
                                <td>{issue.title}</td>
                                <td>{issue.reporterName}</td>
                                <td>{issue.reporterEmail}</td>
                                <td>{issue.priority ==1 ?"normal":"premium" }</td>
                                <td> Upvotes {issue.upvotes? issue.upvotes:0}</td>
                                <td>{issue.status}</td>
                                <td className="flex gap-2">

                                    {User?.role === 'admin' && (
                                        <>
                                            <button
                                                className="btn bg-teal-500"
                                                disabled={issue.assignedStaff}
                                                onClick={() => openAssignModal(issue._id)}
                                            >
                                                Assign Staff
                                            </button>

                                            <button
                                                className="btn bg-red-500"
                                                onClick={() => deleteIssue(issue._id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {User?.role === 'staff' && (
                                        <button
                                            className="btn bg-indigo-500"
                                            onClick={() => openChanger(issue._id)}
                                        >
                                            Change Status
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="border p-4 rounded bg-gray-100 mt-4 max-w-md">
                    <h2 className="font-semibold mb-2">Assign Staff</h2>
                    {stafflist.map(staff => (
                        <div key={staff.email} className="flex justify-between mb-2">
                            <span>{staff.name}</span>
                            <button
                                className="btn btn-sm bg-teal-500"
                                onClick={() => assignStaff(staff.email)}
                            >
                                Assign
                            </button>
                        </div>
                    ))}
                    <button className="btn w-full mt-2" onClick={() => setModalOpen(false)}>
                        Close
                    </button>
                </div>
            )}

            {changerOpen && (
                <div className="border p-4 rounded bg-gray-100 mt-4 max-w-sm">
                    <h2 className="font-semibold mb-3">Change Status</h2>

                    <button className="btn w-full bg-teal-600 mb-2" onClick={() => statusChangerFunction('In progress')}>
                        In progress
                    </button>

                    <button className="btn w-full bg-teal-700 mb-2" onClick={() => statusChangerFunction('working')}>
                        Working



                    </button>

 
 <button className="btn w-full bg-teal-500 mb-2" onClick={() => statusChangerFunction('resolved')}>
                        Resolved
                    </button>


                    <button className="btn w-full bg-teal-400 mb-2" onClick={() => statusChangerFunction('closed')}>
                        Closed
                    </button>

    
                </div>
            )}
        </div>
    );
};

export default List;



