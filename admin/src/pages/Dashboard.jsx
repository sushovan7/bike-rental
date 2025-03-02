import React from "react";

function Dashboard() {
  return (
    <div className=" space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">1,200</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-xl font-semibold">Active Rentals</h2>
          <p className="text-3xl font-bold">85</p>
        </div>
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-3xl font-bold">$12,340</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-2">
          <li className="border-b pb-2">User John Doe rented a bike.</li>
          <li className="border-b pb-2">Payment of $120 received.</li>
          <li className="border-b pb-2">New user registered.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
