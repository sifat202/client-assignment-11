import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/api/api';
import Swal from 'sweetalert2';

const Adminmkstaff = () => {
    const axiosSecure = useAxiosSecure();
    const [staffs, setStaffs] = useState([]);
    const [editingStaff, setEditingStaff] = useState(null);

    useEffect(() => {
        axiosSecure.get('/staff')
            .then(res => setStaffs(res.data))
            .catch(() => {});
    }, [axiosSecure]);

    const handleSubmit = async e => {
        e.preventDefault();

        const form = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            photo: e.target.photo.value,
            phone: e.target.phone.value,
        };
console.log(form)
        try {
            await axiosSecure.post('/admin/create-staff', form);
            Swal.fire('Success', 'Staff created', 'success');
            e.target.reset();
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed');
        }
    };

    const handleUpdate = async e => {
        e.preventDefault();

        try {
            await axiosSecure.patch(`/admin/update-staff/${editingStaff.email}`, {
                name: e.target.name.value,
                photo: e.target.photo.value,
                phone: e.target.phone.value,
            });

            Swal.fire('Updated', 'Staff updated successfully', 'success');
            setEditingStaff(null);

            const res = await axiosSecure.get('/staff');
            setStaffs(res.data);
        } catch {
            Swal.fire('Error', 'Update failed', 'error');
        }
    };
const handleDelete = async (email) => {
  const result = await Swal.fire({
    title: 'Delete staff?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
  });

  if (!result.isConfirmed) return;

  await axiosSecure.delete(`/admin/delete-staff/${email}`);
  const res = await axiosSecure.get('/staff');
  setStaffs(res.data);
};

    return (
        <div className="max-w-5xl mx-auto mt-10 space-y-10">

            {/* CREATE STAFF */}
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
                <h2 className="text-xl font-bold">Create Staff</h2>
                <input name="name" placeholder="Name" className="input input-bordered w-full" />
                <input name="email" placeholder="Email" className="input input-bordered w-full" />
                <input name="password" placeholder="Password" className="input input-bordered w-full" />
                <input name="phone" placeholder="Phone" className="input input-bordered w-full" />
                <input name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
                <button className="btn btn-primary w-full">Create Staff</button>
            </form>

            <div>
                <h2 className="text-xl font-bold mb-4">Staff List</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {staffs.length ==0 &&<><h1 className='text-center text-2xl py-5'>No staffs yet</h1></>}
                    {staffs.map(staff => (
                        <div key={staff._id} className="border p-4 rounded">
                            <p><b>Name:</b> {staff.name}</p>
                            <p><b>Email:</b> {staff.email}</p>
                            <p><b>Phone:</b> {staff.phone}</p>

                            <div className="flex gap-2 mt-2">
  <button
    className="btn btn-sm btn-outline"
    onClick={() => setEditingStaff(staff)}
  >
    Edit
  </button>

  <button
    className="btn btn-sm btn-error text-white"
    onClick={() => handleDelete(staff.email)}
  >
    Delete
  </button>
</div>

                        </div>
                    ))}
                </div>
            </div>

            {editingStaff && (
                <form onSubmit={handleUpdate} className="border p-6 rounded max-w-md">
                    <h3 className="font-bold mb-3">Edit Staff</h3>
                    <input
                        name="name"
                        defaultValue={editingStaff.name}
                        className="input input-bordered w-full mb-2"
                    />
                    <input
                        name="phone"
                        defaultValue={editingStaff.phone}
                        className="input input-bordered w-full mb-2"
                    />
                    <input
                        name="photo"
                        defaultValue={editingStaff.photo}
                        className="input input-bordered w-full mb-2"
                    />

                    <div className="flex gap-2">
                        <button className="btn btn-primary">Update</button>
                        <button
                            type="button"
                            onClick={() => setEditingStaff(null)}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Adminmkstaff;
