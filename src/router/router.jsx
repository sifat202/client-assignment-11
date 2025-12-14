import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
import Home from "../Pages/Home";


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
    }
])




export default router;
