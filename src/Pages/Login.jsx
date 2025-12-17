import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2'; 
import logo from '../assets/piirslogo.png'; 
import { FcGoogle } from "react-icons/fc"; // Google Icon
import useAuth from '../Hooks/useAuth/useAuth';
import useAxiosSecure from '../Hooks/api/api';

const Login = () => {
    const { signIn, googleSignIn } = useAuth(); 
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
const axiosSecure = useAxiosSecure();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        try {


            await signIn(email, password);


           
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome back!`,
                showConfirmButton: false,
                timer: 1500
            });
            
            setTimeout(() => {
                navigate('/'); 
            }, 500);

        } catch (error) {
            console.error(error);
            const errorMessage = error.message.replace('Firebase: Error (auth/', '').replace(').', '');
            
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
             const result= await googleSignIn();
            const user = result.user;
        
            const userDataToSave = {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role: 'citizen', 
                userStatus: 'normal',
                postsmade:0,

                createdAt: new Date(),
            };

           
            await axiosSecure.post('/users', userDataToSave);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Logged in with Google!`,
                showConfirmButton: false,
                timer: 1500
            });
            
            setTimeout(() => {''
                navigate('/'); 
            }, 500);

        } catch (error) {
            console.error(error);
            const errorMessage = error.message.replace('Firebase: Error (auth/', '').replace(').', '');
            
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: errorMessage,
            });
        }
    };


    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
                
                <div className="text-center">
                    <img className="mx-auto h-16 w-auto" src={logo} alt="PIIRS Logo" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign In to Your PIIRS Account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        
                        <div>
                            <label className="label">
                                <span className="label-text">Email address</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="input input-bordered w-full"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="input input-bordered w-full"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {loginError && (
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Error: {loginError}</span>
                        </div>
                    )}
                    
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="divider">OR</div>

                <div>
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    >
                        <FcGoogle className="h-5 w-5 mr-2" />
                        Sign In with Google
                    </button>
                </div>
                
                <div className="text-center text-sm">
                    Don't have an account? 
                    <Link to={"/register"} className="font-medium text-green-600 hover:text-green-500 ml-1">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;