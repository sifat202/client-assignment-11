import React from 'react';
import useAuth from '../Hooks/useAuth/useAuth';

const Home = () => {
    const {user} = useAuth()
    console.log(user)
    return (
        <div>
            <h1 className="text-4xl text-center py-10">Home (component)</h1>
        </div>
    );
};

export default Home;