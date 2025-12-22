import axios from 'axios';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth'; 
const axiosSecure = axios.create({
    baseURL: 'https://issue-server.vercel.app'
});

const useAxiosSecure = () => {
    const auth = getAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            
            async (config) => {
                const currentUser = auth.currentUser;
                
                if (currentUser) {
                    try {
                       
                        const idToken = await currentUser.getIdToken(true);
                        
                       
                        config.headers.Authorization = `Bearer ${idToken}`;
                    } catch (error) {
                        console.error("Error fetching ID Token:", error);
                       
                    }
                }
                return config;
            },
            
           
            (error) => {
                return Promise.reject(error);
            }
        );

     
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
        };
    }, [auth]); 

    return axiosSecure;
};

export default useAxiosSecure;