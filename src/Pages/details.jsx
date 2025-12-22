import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/api/api';
import Swal from 'sweetalert2';

const Details = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState({});

    // Fetch issue details
    const { data: issue, isLoading } = useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    });

    // Fetch logged-in user info
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getusers');
            return res.data;
        }
    });

    const currentUser = users?.find(u => u.email === issue?.reporterEmail);

    React.useEffect(() => {
        if (issue) {
            setForm({
                title: issue.title,
                issueType: issue.issueType,
                description: issue.description,
                location: issue.location,
                photoURL: issue.photoURL
            });
        }
    }, [issue]);

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/issues/${issue._id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['issue', id]);
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                timer: 1200,
                showConfirmButton: false
            });
            setOpen(false);
        }
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        updateMutation.mutate(form);
    };

    const deleteIssue = async (id) => {
        const result = await Swal.fire({
            title: 'Delete this issue?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it',
        });

        if (!result.isConfirmed) return;

        await axiosSecure.delete(`/issues/${id}`);

        Swal.fire({
            title: 'Deleted!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
        });

        navigate('/');
    };

    const handlePromote = async () => {
        if (issue.isPromoted) return;

        localStorage.setItem('promoteIssueId', issue._id);

        const res = await axiosSecure.post('/create-checkout-session', {
            price: 100
        });

        window.location.href = res.data.url;
    };

    if (isLoading) {
        return <div className="text-center mt-16">Loading issue…</div>;
    }

    const canModify = currentUser?.email == issue?.reporterEmail;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={issue.photoURL} className="w-full md:w-96 rounded" />
                <div className="flex flex-col space-y-2">
                    <h1>Title: {issue.title}</h1>
                    <h1>Category: {issue.issueType}</h1>
                    <h1>Status: {issue.status}</h1>
                    <h1>Priority: {issue.priority === 1 ? 'Normal' : 'High'}</h1>
                    <h1>Upvotes: {issue.upvotes || 0}</h1>
                    <h1>Posted By: {issue.reporterName}</h1>
                    <h1>Contact: {issue.reporterEmail}</h1>
                    <p>{issue.description}</p>
                </div>
            </div>
            

            {canModify && 
                <div className="flex flex-col gap-4 mt-10 items-center">
                    <button
                        onClick={() => deleteIssue(issue._id)}
                        disabled={issue.status !== 'pending'}
                        className="btn w-8/12 bg-red-400"
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => setOpen(true)}
                        disabled={issue.status !== 'pending'}
                        className="btn w-8/12 bg-teal-500 text-white"
                    >
                        Edit
                    </button>

                    <button
                        onClick={handlePromote}
                        disabled={issue.isPromoted || issue.status !== 'pending'}
                        className="btn w-8/12 bg-green-500 text-white"
                    >
                        {issue.isPromoted ? 'PROMOTED' : 'PROMOTE (৳100)'}
                    </button>
                </div>
            }

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-3">
                        <input name="title" value={form.title} onChange={handleChange} className="input w-full" />
                        <input name="issueType" value={form.issueType} onChange={handleChange} className="input w-full" />
                        <input name="location" value={form.location} onChange={handleChange} className="input w-full" />
                        <input name="photoURL" value={form.photoURL} onChange={handleChange} className="input w-full" />
                        <textarea name="description" value={form.description} onChange={handleChange} className="textarea w-full" />
                        <button onClick={handleUpdate} className="btn bg-teal-500 text-white w-full">Save</button>
                        <button onClick={() => setOpen(false)} className="btn w-full">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
