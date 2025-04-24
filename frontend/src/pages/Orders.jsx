import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import NewsLetter from "../components/NewsLetter";

function Orders() {
  const { token } = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrderdata = async () => {
    try {
      if (!token) return;

      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/user-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const formattedOrders = response.data.orders.map((order) => ({
          ...order,
          orderDate: new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          address: `${order.address.street}, ${order.address.city}`,
          displayType: order.rentalDuration ? "Rent" : "Purchase",
          rentalStart: order.rentalStartDate
            ? new Date(order.rentalStartDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null,
          rentalEnd: order.rentalEndDate
            ? new Date(order.rentalEndDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null,
        }));
        setOrderData(formattedOrders.reverse());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadOrderdata();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#605DFF]"></div>
      </div>
    );
  }

  return (
    <div className=" text-white min-h-screen pb-12 ">
      <div className="container mx-auto px-4 pt-20 mb-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
              My Orders
            </span>
          </h1>
          <p className="text-gray-400">
            View and manage your rental and purchase history
          </p>
        </motion.div>
        <div className="flex justify-end mb-6">
          <motion.button
            onClick={() => loadOrderdata()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Track All Orders
          </motion.button>
        </div>

        {orderData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800"
          >
            <h3 className="text-xl font-medium mb-2">No orders found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              You haven&apos;t placed any orders yet. Start exploring our
              collection!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {orderData.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#605DFF]/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={
                              order.bike?.images?.[0] || "/bike-placeholder.jpg"
                            }
                            alt={order.bikeName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {order.bikeName || "Bike"}
                        </h3>
                        <p className="text-gray-400 text-sm">{order.address}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold">
                            Rs {order.amount}
                          </span>
                          <span
                            className={`badge ${
                              order.displayType === "Rent"
                                ? "badge-primary"
                                : "badge-success"
                            }`}
                          >
                            {order.displayType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {order.rentalDuration && (
                      <div className="pt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Duration:</span>
                          <span>{order.rentalDuration} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Start:</span>
                          <span>{order.rentalStart}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">End:</span>
                          <span>{order.rentalEnd}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Ordered:</span>
                        <span>{order.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Payment:</span>
                        <span className="capitalize">
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          order.orderStatus
                        )}`}
                      ></span>
                      <span className="capitalize font-medium">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <NewsLetter />
    </div>
  );
}

export default Orders;
