import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
// import AuthLayout from "../layouts/AuthLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Authlayout from "../layouts/Authlayout";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Homelayout></Homelayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
        ]
    },
    {
        path:'/auth',
        element:<Authlayout></Authlayout>,
        children:[
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/auth/login',
                element: <Login></Login>
            },
        ]
    }
]);

export default router;