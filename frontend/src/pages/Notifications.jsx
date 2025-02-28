const notifications = [
  { id: 1, date: "2025-02-28", message: "Your appointment is confirmed." },
  { id: 2, date: "2025-02-27", message: "New course added to your LMS." },
  { id: 3, date: "2025-02-26", message: "Payment received successfully." },
];

const NotificationPage = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-base-100 p-4 rounded-lg shadow flex justify-between items-center border-l-4 border-primary"
          >
            <div>
              <p className="text-sm text-gray-500">{notification.date}</p>
              <p className="text-base font-medium">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
