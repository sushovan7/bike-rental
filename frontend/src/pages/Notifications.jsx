import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Bell, BellOff, Check } from "lucide-react";
import { notificationCount } from "../features/notificationSlice";

const NotificationPage = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [loadingId, setLoadingId] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/notification/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(notificationCount(response.data.data));
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const readNotificationMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/notification/user/${
          user._id
        }/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Notification marked as read");
      }
      setLoadingId(null);
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      setLoadingId(null);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          "Failed to mark notification as read. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  function handleRead(id) {
    setLoadingId(id);
    readNotificationMutation.mutate(id);
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#605DFF]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        {error.message}
      </div>
    );
  }

  const notificationList = [...(data?.data || [])].reverse();

  return (
    <div className=" text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#605DFF] to-[#908EFF]">
              Notifications
            </span>
          </h1>
          <p className="text-gray-400">Your recent alerts and updates</p>
        </motion.div>

        {notificationList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800"
          >
            <BellOff className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No notifications yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              You don&apos;t have any notifications at this time.
            </p>
          </motion.div>
        ) : (
          <motion.div className="space-y-4">
            <AnimatePresence>
              {notificationList.map((notification) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gray-900/50 backdrop-blur-sm border ${
                    notification.read ? "border-gray-800" : "border-[#605DFF]"
                  } rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-full ${
                          notification.read ? "bg-gray-800" : "bg-[#605DFF]/20"
                        }`}
                      >
                        {notification.read ? (
                          <Bell className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Bell className="h-5 w-5 text-[#605DFF]" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">
                          {new Date(notification.createdAt).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                        <p className="text-lg font-medium">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRead(notification._id)}
                      disabled={
                        notification.read || loadingId === notification._id
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        notification.read
                          ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                          : "bg-[#605DFF] hover:bg-[#5654E7] text-white"
                      }`}
                    >
                      {loadingId === notification._id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing</span>
                        </>
                      ) : notification.read ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Read</span>
                        </>
                      ) : (
                        <span>Mark as Read</span>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
