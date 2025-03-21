import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
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

  // const notificationList = data.data.reverse();
  // console.log(notificationList);

  if (!data) {
    return <p>Data not found</p>;
  }

  if (isPending) {
    return <p>Please wait ...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const notificationList = [...data.data];
  const reverseList = notificationList.reverse();
  console.log(reverseList);

  return (
    <div className="w-full bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>
        <div className="space-y-4">
          {reverseList && reverseList.length > 0 ? (
            reverseList.map((notification) => (
              <div
                key={notification._id}
                className={`w-full p-5 rounded-lg shadow-md flex justify-between items-center border-l-4 ${
                  notification.read
                    ? "border-success"
                    : "border-primary bg-base-100"
                }`}
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toDateString()}
                  </p>
                  <p className="text-lg font-medium">{notification.message}</p>
                </div>
                <button
                  onClick={() => handleRead(notification._id)}
                  disabled={notification.read || loadingId === notification._id}
                  className={`px-4 py-2 text-sm rounded-md transition btn ${
                    notification.read
                      ? "btn-success text-white cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-focus"
                  }`}
                >
                  {loadingId === notification._id ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <span>{notification.read ? "Read" : "Mark as Read"}</span>
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
