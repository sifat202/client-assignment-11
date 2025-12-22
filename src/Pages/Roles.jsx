import React, { useEffect } from 'react';
import { FaUserEdit, FaUserShield, FaTools } from 'react-icons/fa';
import { MdOutlineReportProblem, MdAssignmentInd, MdSystemUpdateAlt } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Roles = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const roleData = [
        {
            title: "Citizen",
            icon: <MdOutlineReportProblem className="text-4xl text-teal-600" />,
            animation: "fade-right",
            features: [
                "Report infrastructure issues with photos",
                "Upvote and track report progress",
                "Access premium for unlimited reports"
            ]
        },
        {
            title: "Staff",
            icon: <FaTools className="text-4xl text-blue-600" />,
            animation: "fade-up",
            features: [
                "Manage specifically assigned tasks",
                "Update real-time issue status",
                "Resolve and close reported problems"
            ]
        },
        {
            title: "Admin",
            icon: <FaUserShield className="text-4xl text-red-600" />,
            animation: "fade-left",
            features: [
                "Control system-wide role management",
                "Assign staff to pending reports",
                "Monitor payments and block users"
            ]
        }
    ];

    return (
        <section className="py-16 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12" data-aos="zoom-in">
                    <h2 className="text-3xl font-bold text-gray-800">System Roles</h2>
                    <p className="text-gray-500 mt-2">Tailored access for efficient city management</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roleData.map((role, index) => (
                        <div 
                            key={index}
                            data-aos={role.animation}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                {role.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">{role.title}</h3>
                            <ul className="space-y-3">
                                {role.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roles;