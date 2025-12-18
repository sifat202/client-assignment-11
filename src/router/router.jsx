import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
// import AuthLayout from "../layouts/AuthLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Authlayout from "../layouts/Authlayout";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Pages/Dashboard/Dashboardlayout";
import Myissues from "../Pages/Dashboard/Citizen-dashboard/Myissues";
import Report from "../Pages/Dashboard/Citizen-dashboard/Report";
import Error404 from "../error/Error404";
import Premium from "../Pages/Premium";
import CheckoutForm from "../Pages/Premium";
import PaymentSuccess from "../Components/PaymentSuccess";
import PaymentCancel from "../Components/Cancelled";
import Adminmkstaff from "../Pages/Admin/Adminmkstaff";
import DashboardHome from "../Pages/Dashboard/Citizen-dashboard/DashboardHome";
import List from "../Pages/Dashboard/Citizen-dashboard/List";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homelayout></Homelayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
        ],
        errorElement: <Error404></Error404>
    },
    {
        path: '/',
        element: <Authlayout></Authlayout>,
        children: [
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'premium',
                element: <CheckoutForm></CheckoutForm>
            },
        ],
        errorElement: <Error404></Error404>

    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
            },
            {
                path: '/dashboard/myissues',
                element: <Myissues></Myissues>
            },
            {
                path: '/dashboard/mkstaff',
                element: <Adminmkstaff></Adminmkstaff>
            },
            {
                path: '/dashboard/report',
                element: <Report></Report>
            }
            , 
            {
                path: '/dashboard/list',
                element: <List></List>
            }
            , {
                path: '/dashboard/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            }
            , {
                path: '/dashboard/payment-cancel',
                element: <PaymentCancel></PaymentCancel>
            }
        ],
        errorElement: <Error404></Error404>

    }
]);

export default router;