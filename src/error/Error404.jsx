import React from 'react';
import img from '../assets/404-img.png'
import { Link } from 'react-router';
const Error404 = () => {
    return (
        <div>
            <img src={img} alt="" className="mx-auto h-[700px]" />


            <div className="flex justify-center">
                <button className='btn text-white h-15 text-xl w-60 bg-[#46C9B2] mx-auto'>
                    <Link to={"/"}>Return to Home</Link></button>
                    </div>
        </div>
    );
};

export default Error404;