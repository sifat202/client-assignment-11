import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../Components/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Premium = () => {
    const price = 1000;

    return (
        <div className="max-w-2xl mx-auto py-20 text-center">
            <h1 className="text-4xl font-bold text-teal-600 my-5">Do not like to Be limited?</h1>
            <h1 className="text-2xl text-teal-600 mb-10">
                Join the premium citizenship With <span className='text-pink-400'>{price} BDT</span> Only!!!
            </h1>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                
                    <CheckoutForm price={price} />
                
            </div>
        </div>
    );
};

export default Premium;