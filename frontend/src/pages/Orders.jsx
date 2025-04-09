import { useEffect, useState } from "react";

import NewsLetter from "../components/NewsLetter";
import axios from "axios";
import { useSelector } from "react-redux";

function Orders() {
  const { token } = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState([]);

  const loadOrderdata = async () => {
    try {
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/user-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const formattedOrders = response.data.orders.map((order) => ({
          ...order,
          orderDate: new Date(order.createdAt).toDateString(),
          address: `${order.address.street}, ${order.address.city}`,
          displayType: order.rentalDuration ? "Rent" : "Purchase",
          rentalStart: order.rentalStartDate
            ? new Date(order.rentalStartDate).toDateString()
            : null,
          rentalEnd: order.rentalEndDate
            ? new Date(order.rentalEndDate).toDateString()
            : null,
        }));
        setOrderData(formattedOrders.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadOrderdata();
  }, [token]);

  return (
    <div className="pb-12">
      <div className="container mx-auto px-4 pt-16">
        <div className="mb-12 text-4xl">My Orders</div>

        <div className="space-y-6">
          {orderData.map((order) => (
            <div key={order._id} className=" border border-gray-600 px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">
                    {order.bikeName || "Bike"}
                  </h3>
                  <p className="text-gray-400">{order.address}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">
                      Rs {order.amount}
                    </span>
                    <span className="text-sm px-2 py-1   rounded">
                      {order.displayType === "Rent" ? (
                        <p className="badge badge-primary">Rent</p>
                      ) : (
                        <p className="badge badge-success">Purchase</p>
                      )}
                    </span>
                  </div>

                  {order.rentalDuration && (
                    <div className="pt-2 space-y-1 text-sm text-gray-400">
                      <p>Start: {order.rentalStart}</p>
                      <p>End: {order.rentalEnd}</p>
                      <p>Duration: {order.rentalDuration} days</p>
                    </div>
                  )}

                  <div className="pt-2 text-sm space-y-1">
                    <p className="text-gray-500">Ordered: {order.orderDate}</p>
                    <p>Payment: {order.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="capitalize">{order.orderStatus}</span>
                  </div>
                  <button className="mt-4 md:mt-0 border px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}

export default Orders;
