import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/api/api';
import Swal from 'sweetalert2';

const List = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);

    const { data: issues = [], isLoading: issuesLoading, error: issuesError } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues');
            return res.data;
        },
    });

    const { data: stafflist = [], isLoading: staffLoading, error: staffError } = useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staff');
            return res.data;
        },
    });

    const openModal = (issueId) => {
        setSelectedIssueId(issueId);
        setModalOpen(true);
    };

    const assignStaff = async (staffEmail) => {
        if (!selectedIssueId) return;
        try {
            await axiosSecure.patch(`/assign/${staffEmail}/${selectedIssueId}`);
            setModalOpen(false);
            setSelectedIssueId(null);
            queryClient.invalidateQueries(['issues']);
            Swal.fire({
                icon: 'success',
                title: 'Staff assigned!',
                text: `${staffEmail} has been assigned to the issue.`,
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Could not assign staff. Try again.'
            });
        }
    };

    const deleteIssue = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the issue!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/issues/${id}`);
                queryClient.invalidateQueries(['issues']);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The issue has been deleted.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Could not delete the issue.'
                });
            }
        }
    };

    if (issuesLoading || staffLoading) return <div>Loading...</div>;
    if (issuesError || staffError) return <div>Error loading data</div>;

    return (
        <div>
            <h1 className="text-3xl text-teal-600">These are the issues</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>Citizen</th>
                            <th>citizen mail</th>
                            <th>priority</th>
                            <th>status</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr key={issue._id}>
                                <th>{issue._id.slice(0, 6)}....</th>
                                <td>{issue.title}</td>
                                <td>{issue.reporterName}</td>
                                <td>{issue.reporterEmail}</td>
                                <td>lv{issue.priority}</td>
                                <td>{issue.status}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn bg-teal-500"
                                        onClick={() => openModal(issue._id)}
                                        disabled={issue.status === "assigned"}
                                    >
                                        Assign Staff
                                    </button>
                                    <button
                                        className="btn bg-red-500"
                                        onClick={() => deleteIssue(issue._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="border p-4 rounded bg-gray-100 mt-4">
                    <h2 className="text-lg font-semibold mb-2">Assign Staff</h2>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {stafflist.map((staff) => (
                            <div key={staff.email} className="flex justify-between items-center border p-2 rounded bg-white">
                                <span>{staff.name} ({staff.email})</span>
                                <button className="btn btn-sm bg-teal-500" onClick={() => assignStaff(staff.email)}>Assign</button>
                            </div>
                        ))}
                    </div>
                    <button className="mt-2 btn bg-teal-500 w-full" onClick={() => setModalOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default List;
