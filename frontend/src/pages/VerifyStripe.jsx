import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function VerifyStripe() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token } = useSelector((state) => state.auth);
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/confirm-stripe`,
        { orderId, success },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (await response.data.success) {
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>VerifyStripe</div>;
}

export default VerifyStripe;
