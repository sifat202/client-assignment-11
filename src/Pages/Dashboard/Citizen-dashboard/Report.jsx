import React from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxiosSecure from '../../../Hooks/api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Report = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: dbUser, isLoading } = useQuery({
        queryKey: ['dbUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getuser/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const reportMutation = useMutation({
        mutationFn: async (issueData) => {
            await axiosSecure.post('/issues', issueData);
            await axiosSecure.patch(`/countposts/${user?.email}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['dbUser', user?.email]);
            Swal.fire({
                icon: 'success',
                title: 'Report Submitted!',
                text: 'Your issue has been successfully reported.',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/dashboard/myissues');
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error submitting your report.',
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (dbUser?.userStatus === "normal" && dbUser?.postsmade >= 3) {
            return Swal.fire({
                icon: 'error',
                title: 'Limit reached',
                text: 'Please upgrade to premium for more reports.',
            });
        }

        const issueData = {
            reporterName: user.displayName,
            reporterEmail: user.email,
            title: e.target.title.value,
            issueType: e.target.category.value,
            photoURL: e.target.photo.value,
            description: e.target.details.value,
            location: e.target.location.value,
            status: 'pending',
            priority: 1,
            createdAt: new Date(),
        };

        reportMutation.mutate(issueData);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="w-[600px] mx-auto">
                <div className='border-1 border-gray-400 my-15 rounded '>
                    <form className='m-8 ' onSubmit={handleSubmit}>
                        <fieldset className="fieldset ">
                            <input name='title' type="text" className="input my-2 w-full" placeholder="Title" required />
                            <input name='category' type="text" className="input my-2 w-full" placeholder="Category" required />
                            <input name='photo' type="url" className="input my-2 w-full" placeholder="Photo URL" />
                            <input name='location' type="text" className="input my-2 w-full" placeholder="Location" required />
                            <textarea name='details' rows="4" placeholder='Description' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500' required></textarea>
                            <button type="submit" disabled={reportMutation.isPending} className="btn text-white bg-teal-600 mt-4">
                                {reportMutation.isPending ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Report;