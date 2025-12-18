import { useEffect } from "react";
import useAxiosSecure from "../Hooks/api/api";
import useAuth from "../Hooks/useAuth/useAuth";


const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .patch(`/users/premium/${user.email}`)
                .then(res => {
                    console.log("User upgraded:", res.data);
                })
                .catch(err => {
                    console.error("Premium upgrade failed:", err);
                });
        }
    }, [user, axiosSecure]);

    return (
        <div className="text-center py-20">
            <h1 className="text-3xl text-green-600 font-bold">
                Payment Successful 🎉
            </h1>
        </div>
    );
};

export default PaymentSuccess;
