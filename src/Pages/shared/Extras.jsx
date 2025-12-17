import React from 'react';
import { FaChartLine, FaMapMarkerAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const Extras = () => {
    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                
                {/* --- Section 1: Statistics Dashboard Preview --- */}
                <section className="mb-20">
                    <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900 border-b-2 border-green-500 pb-3">
                        Real-time Impact Overview
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        
                        {/* Card 1: Total Issues */}
                        <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-50 p-6 rounded-lg shadow-xl border-l-4 border-blue-500 transition duration-300 hover:shadow-2xl">
                            <FaUsers className="w-8 h-8 text-blue-500 mb-3" />
                            <p className="text-sm font-medium text-gray-500 uppercase">Total Reports</p>
                            <h3 className="text-4xl font-bold text-gray-800 mt-1">
                                4,128
                            </h3>
                        </div>

                        {/* Card 2: Issues Resolved */}
                        <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-50 p-6 rounded-lg shadow-xl border-l-4 border-green-500 transition duration-300 hover:shadow-2xl">
                            <FaCheckCircle className="w-8 h-8 text-green-500 mb-3" />
                            <p className="text-sm font-medium text-gray-500 uppercase">Resolved Issues</p>
                            <h3 className="text-4xl font-bold text-gray-800 mt-1">
                                3,591
                            </h3>
                        </div>

                        {/* Card 3: Issues In Progress */}
                        <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-50 p-6 rounded-lg shadow-xl border-l-4 border-yellow-500 transition duration-300 hover:shadow-2xl">
                            <FaChartLine className="w-8 h-8 text-yellow-500 mb-3" />
                            <p className="text-sm font-medium text-gray-500 uppercase">In Progress</p>
                            <h3 className="text-4xl font-bold text-gray-800 mt-1">
                                215
                            </h3>
                        </div>
                        
                        {/* Card 4: Average Resolution Time */}
                        <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-50 p-6 rounded-lg shadow-xl border-l-4 border-red-500 transition duration-300 hover:shadow-2xl">
                            <FaChartLine className="w-8 h-8 text-red-500 mb-3" />
                            <p className="text-sm font-medium text-gray-500 uppercase">Avg. Resolution Time</p>
                            <h3 className="text-4xl font-bold text-gray-800 mt-1">
                                3.2 Days
                            </h3>
                        </div>
                    </div>
                </section>

                {/* --- Section 2: Interactive Map Placeholder --- */}
                <section>
                    <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900 border-b-2 border-green-500 pb-3">
                        Track Issues Live on the Map
                    </h2>
                    <div className="bg-gray-200 h-96 w-full rounded-xl shadow-inner border border-gray-300 flex items-center justify-center relative overflow-hidden">
                        
                        <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
                        
                        <div className="relative text-center p-8 bg-white/90 rounded-lg shadow-2xl">
                            <FaMapMarkerAlt className="w-12 h-12 text-green-600 mx-auto mb-3 animate-bounce" />
                            <h3 className="text-2xl font-semibold text-gray-800">
                                Your problems are to be finished
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Report your local issues
                            </p>
                            <div className="mt-4">
                                <button className="bg-green-600 text-white py-2 px-4 rounded-full text-sm hover:bg-green-700 transition duration-200">

                                    <Link to={'/dashboard'}>
                                    Report
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        </div>
    );
};

export default Extras;