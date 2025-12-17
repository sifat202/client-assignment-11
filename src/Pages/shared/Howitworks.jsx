import React from 'react';
import { MdOutlineReportProblem, MdOutlinePendingActions, MdVerifiedUser } from 'react-icons/md';
import { BiTask, BiSupport } from 'react-icons/bi';
import { RiFileList2Line } from 'react-icons/ri';

const Howitworks = () => {
    const steps = [
        {
            title: "1. Report the Issue",
            description: "Easily submit a detailed report about any infrastructure problem, including location coordinates, photo evidence, and a description. Your report is securely sent to our database.",
            icon: <MdOutlineReportProblem className="w-12 h-12 text-green-600 mb-4" />,
            aos: "fade-right"
        },
        {
            title: "2. Admin Approval & Review",
            description: "Your submitted issue is first queued for review. Our administrators verify the details and location, prioritize the urgency (Low/Medium/High), and formally approve it for action.",
            icon: <MdOutlinePendingActions className="w-12 h-12 text-yellow-600 mb-4" />,
            aos: "fade-up"
        },
        {
            title: "3. Staff Resolution & Update",
            description: "Once approved, the issue is assigned to the relevant staff team. They resolve the problem, update the status to 'Resolved', and you are notified of the completion.",
            icon: <MdVerifiedUser className="w-12 h-12 text-blue-600 mb-4" />,
            aos: "fade-left"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
                    How PIIRS Works
                </h2>
                <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                    From reporting a problem to its final resolution, here is the simple three-step journey of every issue submitted.
                </p>

                <div className="flex flex-wrap justify-center gap-8">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            data-aos={step.aos}
                            data-aos-delay={index * 150}
                            className="w-full sm:w-1/2 lg:w-1/4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 border-t-4 border-green-500"
                        >
                            <div className="flex flex-col items-center text-center">
                                {step.icon}
                                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Howitworks;