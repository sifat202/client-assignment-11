import React, { useEffect } from 'react';
import { FaCheckCircle, FaRocket, FaUsers, FaChartLine } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const OurMission = () => {
    useEffect(() => {
        AOS.init({ duration: 1200, once: true });
    }, []);

    const values = [
        {
            icon: <FaRocket className="text-teal-500" />,
            title: "Response Speed",
            desc: "Reducing the gap between reporting an issue and its resolution through direct staff assignment."
        },
        {
            icon: <FaUsers className="text-blue-500" />,
            title: "Citizen Power",
            desc: "Providing a centralized platform where every voice is heard and every pothole is tracked."
        },
        {
            icon: <FaChartLine className="text-purple-500" />,
            title: "Data Integrity",
            desc: "Analyzing infrastructure data to help authorities make smarter, more efficient decisions."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <section className="relative py-20 bg-teal-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 data-aos="fade-down" className="text-4xl md:text-6xl font-extrabold mb-6">
                        Bridging the Gap Between <br />
                        <span className="text-teal-400">Citizens & Authorities</span>
                    </h1>
                    <p data-aos="fade-up" className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Our mission is to digitize municipal services, ensuring that broken streetlights and damaged footpaths are fixed before they become major safety hazards.
                    </p>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-800 rounded-full opacity-20 blur-3xl"></div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div data-aos="fade-right">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why We Built This Platform</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            For too long, municipal services have suffered from delayed responses and a lack of accountability. Citizens often found themselves with no centralized way to report real-world problems like water leakages or garbage overflow.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Real-time tracking from Pending to Closed status",
                                "Full transparency with an audit-ready timeline",
                                "Priority support for our Premium Citizen members"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <FaCheckCircle className="text-teal-600 shrink-0" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div data-aos="zoom-in" className="relative">
                        <img 
                            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                            alt="City Infrastructure" 
                            className="rounded-3xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                            <p className="text-4xl font-bold text-teal-600">100%</p>
                            <p className="text-gray-500 text-sm">Transparent Reporting</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, index) => (
                            <div 
                                key={index} 
                                data-aos="fade-up" 
                                data-aos-delay={index * 200}
                                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center"
                            >
                                <div className="text-5xl flex justify-center mb-6">{val.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{val.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 text-center" data-aos="zoom-out">
                <div className="max-w-4xl mx-auto px-4 bg-teal-600 p-12 rounded-[3rem] text-white shadow-2xl">
                    <h2 className="text-3xl font-bold mb-6">Ready to make your city better?</h2>
                    <p className="mb-8 text-teal-50">
                        Join our platform today to report issues, track progress, and contribute to a safer, cleaner infrastructure.
                    </p>
                    <button className="bg-white text-teal-600 px-10 py-4 rounded-full font-bold hover:bg-teal-50 transition-colors shadow-lg">
                       
<Link to={'/dashboard'}> Submit a Report Now</Link>                    </button>
                </div>
            </section>
        </div>
    );
};

export default OurMission;