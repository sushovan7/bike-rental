import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Bike,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState("week");

  const metrics = [
    {
      title: "Total Users",
      value: "2,450",
      icon: <Users className="text-blue-500" />,
      change: "+8%",
      isPositive: true,
    },
    {
      title: "KYC Verified",
      value: "1,890",
      icon: <UserCheck className="text-green-500" />,
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Total Bikes",
      value: "320",
      icon: <Bike className="text-purple-500" />,
      change: "+5%",
      isPositive: true,
    },
    {
      title: "Currently Rented",
      value: "142",
      icon: <Bike className="text-yellow-500" />,
      change: "-3%",
      isPositive: false,
    },
    {
      title: "Bikes Sold",
      value: "28",
      icon: <Bike className="text-red-500" />,
      change: "+15%",
      isPositive: true,
    },
    {
      title: "Total Revenue",
      value: "$24,580",
      icon: <DollarSign className="text-emerald-500" />,
      change: "+18%",
      isPositive: true,
    },
  ];

  const bikeCategories = [
    { name: "Electric", percentage: 35, color: "bg-blue-500" },
    { name: "Mountain", percentage: 25, color: "bg-purple-500" },
    { name: "Road", percentage: 20, color: "bg-green-500" },
    { name: "Hybrid", percentage: 15, color: "bg-yellow-500" },
    { name: "Other", percentage: 5, color: "bg-gray-500" },
  ];

  const revenueData = {
    day: [1200, 1800, 1500, 2000, 1700, 2200, 1900],
    week: [8500, 9200, 7800, 10500, 9800, 11200, 12400],
    month: [32000, 28000, 35000, 38000],
    "3month": [95000, 105000, 112000],
    "6month": [210000, 230000],
    alltime: [520000],
  };

  const currentRevenue = revenueData[timePeriod].reduce((a, b) => a + b, 0);
  const prevRevenue =
    timePeriod === "day"
      ? 8500
      : timePeriod === "week"
      ? 32000
      : timePeriod === "month"
      ? 95000
      : timePeriod === "3month"
      ? 210000
      : 0;
  const revenueChange = (
    ((currentRevenue - prevRevenue) / prevRevenue) *
    100
  ).toFixed(0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-base-100">
      <div>
        <h1 className="text-3xl font-bold text-base-content">
          Bike Rental & Sales Dashboard
        </h1>
        <p className="text-sm text-base-content/70">Performance overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-base-content/70">{m.title}</p>
                  <p className="text-xl font-semibold mt-1 text-base-content">
                    {m.value}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-base-300/50">{m.icon}</div>
              </div>
              <div
                className={`flex items-center text-sm mt-2 ${
                  m.isPositive ? "text-success" : "text-error"
                }`}
              >
                {m.isPositive ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span className="ml-1">{m.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bike Categories */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-6">
            <h2 className="card-title text-lg text-base-content">
              Bike Categories
            </h2>
            <div className="space-y-4 mt-4">
              {bikeCategories.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-base-content">
                      {c.name}
                    </span>
                    <span className="text-sm text-base-content">
                      {c.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${c.color}`}
                      style={{ width: `${c.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-6">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-lg text-base-content">Revenue</h2>
              <div className="flex gap-1">
                {["day", "week", "month", "3month", "6month", "alltime"].map(
                  (p) => (
                    <button
                      key={p}
                      className={`btn btn-xs ${
                        timePeriod === p ? "btn-primary" : "btn-ghost"
                      }`}
                      onClick={() => setTimePeriod(p)}
                    >
                      {p === "3month" ? "3M" : p === "6month" ? "6M" : p}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-2 items-end h-48 mt-6">
              {revenueData[timePeriod].map((amount, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary rounded-t"
                    style={{
                      height: `${
                        (amount / Math.max(...revenueData[timePeriod])) * 100
                      }%`,
                    }}
                  ></div>
                  <span className="text-xs mt-1 text-base-content/70">
                    {timePeriod === "day"
                      ? ["M", "T", "W", "T", "F", "S", "S"][i]
                      : `#${i + 1}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-sm text-base-content/70">Total</p>
                <p className="text-xl font-bold text-base-content">
                  ${currentRevenue.toLocaleString()}
                </p>
              </div>
              <div
                className={`flex items-center ${
                  revenueChange >= 0 ? "text-success" : "text-error"
                }`}
              >
                {revenueChange >= 0 ? (
                  <TrendingUp size={20} />
                ) : (
                  <TrendingDown size={20} />
                )}
                <span className="ml-1">{Math.abs(revenueChange)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
