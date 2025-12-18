import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/api/api';

const Adminmkstaff = () => {
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        

        await axiosSecure.post('/admin/create-staff',form);

        setForm({
            name: '',
            email: '',
            password: '',
            photo: ''
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input input-bordered w-full" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" />
                <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="input input-bordered w-full" />
                <input name="photo" value={form.photo} onChange={handleChange} placeholder="Photo URL" className="input input-bordered w-full" />
                <button className="btn btn-primary w-full">Create Staff</button>
            </form>
        </div>
    );
};

export default Adminmkstaff;




