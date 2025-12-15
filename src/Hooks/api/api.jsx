import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

// Now, we export the axiosSecure instance DIRECTLY
export default axiosSecure;