import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxiosSecure from '../../../Hooks/api/api';
import { Link } from 'react-router';

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/getuser/${user.email}`)
                .then(res => setDbUser(res.data))
                .catch(() => setDbUser(null));
        }
    }, [user, axiosSecure]);

    if (!dbUser) return null;

    const isAdmin = dbUser.role === 'admin';
    const isStaff = dbUser.role === 'staff';
    const isCitizen = !isAdmin && !isStaff;

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">

                <div className="flex justify-center mb-4">
                    <img
                        src={user?.photoURL || 'https://placehold.co/100x100'}
                        alt="User"
                        className="w-24 h-24 rounded-full object-cover border-4 border-teal-600"
                    />
                </div>

                <h1 className="text-2xl font-bold text-gray-800">
                    {user?.displayName || 'User'}
                </h1>

                <p className="text-sm text-gray-500 mb-4">
                    {user?.email}
                </p>

                {(isAdmin || isStaff) && (
                    <div className="bg-teal-50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                            Your Role
                        </p>
                        <span className="inline-block px-4 py-1 text-sm font-bold text-white bg-teal-600 rounded-full uppercase">
                            {dbUser.role}
                        </span>
                    </div>
                )}

                {isCitizen && (
                    <>
                        <div className="bg-teal-50 rounded-xl p-4 mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                Account Status
                            </p>

                            {dbUser.userStatus === 'premium' ? (
                                <span className="inline-block px-4 py-1 text-sm font-bold text-white bg-teal-600 rounded-full">
                                    Premium Citizen
                                </span>
                            ) : (
                                <span className="inline-block px-4 py-1 text-sm font-semibold text-teal-600 border border-teal-600 rounded-full">
                                    Free User
                                </span>
                            )}
                        </div>

                        {dbUser.userStatus !== 'premium' && (
                            <Link
                                to="/premium"
                                className="block w-full py-2 rounded-xl border border-teal-600 text-teal-600 font-semibold hover:bg-teal-50 transition"
                            >
                                Upgrade to Premium
                            </Link>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default DashboardHome;
