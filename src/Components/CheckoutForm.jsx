import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/api/api";

const CheckoutForm = ({ price }) => {
    const axiosSecure = useAxiosSecure();

    const handleCheckout = async () => {
        try {
            const res = await axiosSecure.post('/create-checkout-session', { price });

            // Redirect to Stripe Checkout
            window.location.href = res.data.url;

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: error.message,
            });
        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="btn bg-teal-600 text-white w-full mt-6 hover:bg-teal-700"
        >
            Pay {price} BDT
        </button>
    );
};

export default CheckoutForm;
