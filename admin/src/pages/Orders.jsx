import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchOrders() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/order/all-orders`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setOrders(response.data.orders.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/order/update-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success("Order status updated");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const getPaymentBadgeClass = (paymentMethod, isPaid) => {
    if (paymentMethod === "cod" || !isPaid) {
      return "badge-warning";
    }
    return "badge-success";
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto bg-base-100 ">
          <table className="table">
            <thead>
              <tr>
                <th>Items</th>
                <th>Customer Info</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover border-b border-gray-600">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded">
                          <img
                            src={order.bike.images[0]}
                            alt={order.bike.bikeName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{order.bike.bikeName}</div>
                        <div className="text-sm opacity-50">
                          1 × Rs{order.amount}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium">
                        {order.phone || "Phone not provided"}
                      </p>
                      <p className="text-sm opacity-70 line-clamp-1">
                        {`${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipcode}`}
                      </p>
                    </div>
                  </td>
                  <td className="font-bold">Rs {order.amount}</td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span className="capitalize">{order.paymentMethod}</span>
                      <span
                        className={`badge badge-sm ${getPaymentBadgeClass(
                          order.paymentMethod,
                          order.payment
                        )}`}
                      >
                        {order.paymentMethod === "cod" || !order.payment
                          ? "Pending"
                          : "Paid"}
                      </span>
                    </div>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`select select-bordered select-sm `}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow ">
            <div className="card-body p-4 border-b border-gray-600">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded">
                      <img
                        src={order.bike.images[0]}
                        alt={order.bike.bikeName}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{order.bike.bikeName}</h3>
                    <p className="text-sm opacity-50">1 × Rs{order.amount}</p>
                  </div>
                </div>
                <span className="font-bold">Rs {order.amount}</span>
              </div>

              <div className="divider my-2"></div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{order.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">Address</p>
                  <p className="line-clamp-2">
                    {`${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipcode}`}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Payment</p>
                  <span
                    className={`badge ${getPaymentBadgeClass(
                      order.paymentMethod,
                      order.payment
                    )}`}
                  >
                    {order.paymentMethod === "cod" || !order.payment
                      ? "Pending"
                      : "Paid"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className={`select select-bordered select-xs `}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped" className="text-white">
                      Shipped
                    </option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-xl font-medium text-gray-500">
            No orders found
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
