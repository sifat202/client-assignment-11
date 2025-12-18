import React from 'react';
import useAxiosSecure from '../../Hooks/api/api';
import Swal from 'sweetalert2';

const Adminmkstaff = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async e => {
        e.preventDefault();

        const form = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            photo: e.target.photo.value
        };

        try {
            await axiosSecure.post('/admin/create-staff', form);

            Swal.fire({
                icon: 'success',
                title: 'Staff Created',
                text: 'Staff account has been created successfully'
            });

            e.target.reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data?.message || 'Something went wrong'
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Name" className="input input-bordered w-full" />
                <input name="email" placeholder="Email" className="input input-bordered w-full" />
                <input name="password" placeholder="Password" className="input input-bordered w-full" />
                <input name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
                <button className="btn btn-primary w-full">Create Staff</button>
            </form>
        </div>
    );
};

export default Adminmkstaff;
