import React from 'react';
import useAuth from '../Hooks/useAuth/useAuth';
import useAxiosSecure from '../Hooks/api/api';
import FirstBanner from './shared/FirstBanner';
import Howitworks from './shared/Howitworks';
import Extras from './shared/Extras';
import Resolved from './Resolved';

const Home = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const fetchSecretData = async () => {
        try {
            const response = await axiosSecure.get('/getusers'); 
            console.log(response.data);
        } catch (error) {
            console.error('Access denied:', error);
        }
    };

    return (
        /* Using min-h-screen to ensure the page looks good even with little content */
        <div className="min-h-screen">

            <div className="py-10 flex justify-center mx-auto">
                <FirstBanner />
            </div>

            {/* MODIFICATION HERE: 
               Removed w-[1200px] and the grid classes. 
               The 'Resolved' component now handles its own layout and centering.
            */}
            <h1 className="text-xl text-center my-10">Recent resolved issues</h1>
            <div className="py-10">
                <Resolved />
            </div>

            <div className="py-10">
                <Howitworks />
            </div>

            <div className="py-10">
                <Extras />
            </div>
            
        </div>
    );
};

export default Home;