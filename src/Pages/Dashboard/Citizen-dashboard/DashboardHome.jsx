import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxiosSecure from '../../../Hooks/api/api';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [dbUser, setDbUser] = useState(null);
    const [issues, setIssues] = useState([]);
    const [payments, setPayments] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showStaffOnly, setShowStaffOnly] = useState(false);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/getuser/${user.email}`)
                .then(res => setDbUser(res.data))
                .catch(() => setDbUser(null));
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        if (dbUser?.role === 'admin') {
            axiosSecure.get('/issues').then(res => setIssues(res.data));
            axiosSecure.get('/payments').then(res => setPayments(res.data));
            axiosSecure.get('/getusers').then(res => setAllUsers(res.data));
        }
    }, [dbUser, axiosSecure]);

    if (!dbUser) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-teal-600"></span></div>;

    const isAdmin = dbUser.role === 'admin';
    const isStaff = dbUser.role === 'staff';
    const isCitizen = !isAdmin && !isStaff;

    const chartData = [
        { name: 'Total', count: issues.length, color: '#0d9488' },
        { name: 'Resolved', count: issues.filter(i => i.status === 'resolved').length, color: '#10b981' },
        { name: 'Pending', count: issues.filter(i => i.status === 'pending').length, color: '#f59e0b' },
        { name: 'Rejected', count: issues.filter(i => i.status === 'rejected').length, color: '#ef4444' },
    ];

    const displayedUsers = showStaffOnly 
        ? allUsers.filter(u => u.role === 'staff') 
        : allUsers;

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center lg:text-left">
                    Welcome back, <span className="text-teal-600">{user?.displayName || 'User'}</span>!
                </h1>
                <p className="text-gray-500 text-center lg:text-left">Here is what's happening with your account today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center sticky top-8">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <img
                                src={user?.photoURL || 'https://placehold.co/100x100'}
                                alt="User"
                                className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 shadow-sm"
                            />
                            {dbUser.userStatus === 'premium' && (
                                <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow-sm">⭐</span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 truncate">{user?.displayName}</h2>
                        <p className="text-xs text-gray-400 mb-6 break-all">{user?.email}</p>

                        <div className="space-y-3">
                            <div className="p-3 bg-teal-50 rounded-xl">
                                <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Role</p>
                                <p className="text-sm font-bold text-teal-900 capitalize">{dbUser.role}</p>
                            </div>

                            {isCitizen && (
                                <div className={`p-3 rounded-xl border ${dbUser.userStatus === 'premium' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Membership</p>
                                    <p className={`text-sm font-bold ${dbUser.userStatus === 'premium' ? 'text-yellow-700' : 'text-gray-700'}`}>
                                        {dbUser.userStatus === 'premium' ? 'Premium Citizen' : 'Free Account'}
                                    </p>
                                </div>
                            )}

                            {isCitizen && dbUser.userStatus !== 'premium' && (
                                <Link to="/premium" className="block w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-md active:scale-95">
                                    Upgrade to Premium
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                    {isAdmin && (
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-teal-500 rounded-full"></span>
                                System Issues Overview
                            </h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                        <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                                    Registered Users
                                </h3>
                                <button 
                                    onClick={() => setShowStaffOnly(!showStaffOnly)}
                                    className={`btn btn-sm ${showStaffOnly ? 'btn-secondary' : 'btn-outline btn-teal'}`}
                                >
                                    {showStaffOnly ? "Show All Users" : "View Staff Only"}
                                </button>
                            </div>
                            
                            <div className="overflow-x-auto -mx-4 md:mx-0">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Name</th>
                                            <th className="px-4 py-3 font-semibold">Role</th>
                                            <th className="px-4 py-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {displayedUsers.map(u => (
                                            <tr key={u._id} className="hover:bg-gray-50 transition-colors text-sm">
                                                <td className="px-4 py-4 font-medium text-gray-900">{u.name}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-red-100 text-red-600' : u.role === 'staff' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-gray-500 capitalize">{u.userStatus || 'Active'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                                    Recent Transactions
                                </h3>
                                <Link to="/dashboard/payments" className="text-teal-600 text-sm font-semibold hover:underline">View All</Link>
                            </div>
                            
                            <div className="overflow-x-auto -mx-4 md:mx-0">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">User</th>
                                            <th className="px-4 py-3 font-semibold">Amount</th>
                                            <th className="px-4 py-3 font-semibold hidden md:table-cell">Purpose</th>
                                            <th className="px-4 py-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {payments.slice(0, 5).map(p => (
                                            <tr key={p._id} className="hover:bg-gray-50 transition-colors text-sm">
                                                <td className="px-4 py-4 truncate max-w-[150px]">{p.userEmail}</td>
                                                <td className="px-4 py-4 font-bold text-gray-700">{p.amount} BDT</td>
                                                <td className="px-4 py-4 hidden md:table-cell text-gray-500 capitalize">{p.purpose}</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase">
                                                        {p.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;