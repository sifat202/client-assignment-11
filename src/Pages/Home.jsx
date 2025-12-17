import React from 'react';
import useAuth from '../Hooks/useAuth/useAuth';
import useAxiosSecure from '../Hooks/api/api';
import FirstBanner from './shared/FirstBanner';
import Howitworks from './shared/Howitworks';
import Extras from './shared/Extras';

const Home = () => {
    const {user} = useAuth()
    console.log(user)

    const axiosSecure = useAxiosSecure();
const fetchSecretData = async () => {
        try {
            // When you call this, the interceptor automatically adds the token!
            const response = await axiosSecure.get('/getusers'); 
            console.log(response.data);
        } catch (error) {
            console.error('Access denied:', error);
        }
    };

    return (
        <div>

            <div className="py-10">
                <FirstBanner></FirstBanner>
            </div>

            <div className="py-5">
                {/* upcoming.... */}
            </div>

            <div className="py-5">
                <Howitworks></Howitworks>
            </div>
            <div className="py-5">
                <Extras></Extras>
            </div>
        </div>
    );
};

export default Home;