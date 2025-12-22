import React from 'react';

const Stepper = ({ currentStatus }) => {
    // 1. Define the exact sequence from your database
    // Note: Use lowercase if your DB stores 'closed' instead of 'Closed'
    const statuses = ["pending", "In progress", "working", "resolved", "closed"];
    
    // 2. Find where we are in the list
    const currentStepIndex = statuses.indexOf(currentStatus);

    return (
        <div className="w-full py-6">
            {/* 3. Responsive Classes: Vertical on mobile, Horizontal on LG screens */}
            <ul className="steps steps-vertical lg:steps-horizontal w-full text-sm">
                
                {/* Step 1: Pending */}
                <li className={`step ${currentStepIndex >= 0 ? "step-primary" : ""}`} 
                    data-content={currentStepIndex >= 0 ? "✓" : "1"}>
                    Reported
                </li>

                {/* Step 2: In Progress */}
                <li className={`step ${currentStepIndex >= 1 ? "step-primary" : ""}`} 
                    data-content={currentStepIndex >= 1 ? "✓" : "2"}>
                    In Progress
                </li>

                {/* Step 3: Working */}
                <li className={`step ${currentStepIndex >= 2 ? "step-primary" : ""}`} 
                    data-content={currentStepIndex >= 2 ? "✓" : "3"}>
                    Working
                </li>

                {/* Step 4: Resolved */}
                <li className={`step ${currentStepIndex >= 3 ? "step-primary" : ""}`} 
                    data-content={currentStepIndex >= 3 ? "✓" : "4"}>
                    Resolved
                </li>

                {/* Step 5: Closed */}
                <li className={`step ${currentStepIndex >= 4 ? "step-primary" : ""}`} 
                    data-content={currentStepIndex >= 4 ? "★" : "5"}>
                    Closed
                </li>
            </ul>
        </div>
    );
};

export default Stepper;