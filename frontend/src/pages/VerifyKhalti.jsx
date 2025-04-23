import axios from "axios";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function VerifyKhalti() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const calledRef = useRef(false);

  const verifyPayment = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const stored = localStorage.getItem("khalti_order_data");
    if (!stored) return;

    const {
      pidx,
      bikeId,
      amount,
      address,
      phone,
      firstName,
      lastName,
      email,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
    } = JSON.parse(stored);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/confirm-khalti`,
        {
          pidx,
          bikeId,
          amount,
          address,
          phone,
          firstName,
          lastName,
          email,
          rentalDuration,
          rentalStartDate,
          rentalEndDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Payment verified successfully!");
        localStorage.removeItem("khalti_order_data");
        navigate("/orders");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error(error.response?.data?.message || error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="p-4 text-center">
      <h2>Verifying your payment...</h2>
      <p>Please wait while we confirm your payment details.</p>
    </div>
  );
}
export default VerifyKhalti;
