import { useEffect } from "react";
import useAxiosSecure from "../Hooks/api/api";
import useAuth from "../Hooks/useAuth/useAuth";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const promoteIssueId = localStorage.getItem('promoteIssueId');

        if (promoteIssueId) {
            axiosSecure.patch(`/issues/promote/${promoteIssueId}`)
                .then(res => {
                    console.log("Issue promoted:", res.data);
                    localStorage.removeItem('promoteIssueId');
                    navigate('/dashboard');
                })
                .catch(err => {
                    console.error("Issue promotion failed:", err);
                });
        } else if (user?.email) {
            axiosSecure
                .patch(`/users/premium/${user.email}`)
                .then(res => {
                    console.log("User upgraded:", res.data);
                    navigate('/dashboard');
                })
                .catch(err => {
                    console.error("Premium upgrade failed:", err);
                });
        }
    }, [user, axiosSecure, navigate]);

    return (
        <div className="text-center py-20">
            <h1 className="text-3xl text-green-600 font-bold">
                Payment Successful 🎉
            </h1>
        </div>
    );
};

export default PaymentSuccess;
