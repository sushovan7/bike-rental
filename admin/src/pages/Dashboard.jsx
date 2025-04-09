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
  // Time period state
  const [timePeriod, setTimePeriod] = useState("week");

  // Metrics data - replace with your API data
  const metrics = [
    {
      title: "Total Users",
      value: "2,450",
      icon: <Users className="text-primary" />,
      change: "+8%",
      isPositive: true,
    },
    {
      title: "KYC Verified",
      value: "1,890",
      icon: <UserCheck className="text-secondary" />,
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Total Bikes",
      value: "320",
      icon: <Bike className="text-accent" />,
      change: "+5%",
      isPositive: true,
    },
    {
      title: "Currently Rented",
      value: "142",
      icon: <Bike className="text-info" />,
      change: "-3%",
      isPositive: false,
    },
    {
      title: "Bikes Sold",
      value: "28",
      icon: <Bike className="text-success" />,
      change: "+15%",
      isPositive: true,
    },
    {
      title: "Total Revenue",
      value: "$24,580",
      icon: <DollarSign className="text-warning" />,
      change: "+18%",
      isPositive: true,
    },
  ];

  // Bike categories data
  const bikeCategories = [
    { name: "Electric", percentage: 35, color: "bg-primary" },
    { name: "Mountain", percentage: 25, color: "bg-secondary" },
    { name: "Road", percentage: 20, color: "bg-accent" },
    { name: "Hybrid", percentage: 15, color: "bg-success" },
    { name: "Other", percentage: 5, color: "bg-warning" },
  ];

  // Revenue data by time period
  const revenueData = {
    day: [1200, 1800, 1500, 2000, 1700, 2200, 1900],
    week: [8500, 9200, 7800, 10500, 9800, 11200, 12400],
    month: [32000, 28000, 35000, 38000],
    "3month": [95000, 105000, 112000],
    "6month": [210000, 230000],
    alltime: [520000],
  };

  // Calculate total for current period
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bike Rental Dashboard</h1>
        <p className="text-neutral-content">Weekly performance overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-neutral-content">
                    {metric.title}
                  </p>
                  <p className="text-xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className="p-2 rounded-full bg-opacity-20 bg-primary">
                  {metric.icon}
                </div>
              </div>
              <div
                className={`flex items-center mt-2 text-sm ${
                  metric.isPositive ? "text-success" : "text-error"
                }`}
              >
                {metric.isPositive ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span className="ml-1">{metric.change} from last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bike Categories Pie Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Bike Categories Distribution</h2>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Pie Chart Visualization */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-[20px] border-transparent">
                  {bikeCategories.map((category, i) => {
                    const offset = bikeCategories
                      .slice(0, i)
                      .reduce((sum, c) => sum + c.percentage, 0);
                    return (
                      <div
                        key={i}
                        className={`absolute inset-0 rounded-full border-[20px] ${category.color}`}
                        style={{
                          clipPath: `polygon(50% 50%, ${
                            50 + 50 * Math.cos((2 * Math.PI * offset) / 100)
                          }% ${
                            50 + 50 * Math.sin((2 * Math.PI * offset) / 100)
                          }%, ${
                            50 +
                            50 *
                              Math.cos(
                                (2 * Math.PI * (offset + category.percentage)) /
                                  100
                              )
                          }% ${
                            50 +
                            50 *
                              Math.sin(
                                (2 * Math.PI * (offset + category.percentage)) /
                                  100
                              )
                          }%)`,
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-base-100 w-24 h-24 rounded-full flex items-center justify-center">
                    <span className="font-bold">100%</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {bikeCategories.map((category, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${category.color}`}
                    ></div>
                    <span>
                      {category.name} - {category.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Bar Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Revenue Analysis</h2>
              <div className="flex gap-2">
                {["day", "week", "month", "3month", "6month", "alltime"].map(
                  (period) => (
                    <button
                      key={period}
                      className={`btn btn-xs ${
                        timePeriod === period ? "btn-primary" : "btn-ghost"
                      }`}
                      onClick={() => setTimePeriod(period)}
                    >
                      {period === "3month"
                        ? "3M"
                        : period === "6month"
                        ? "6M"
                        : period}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-end justify-between h-64 mt-4 gap-2 px-4">
              {revenueData[timePeriod].map((amount, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-primary rounded-t hover:bg-primary-focus transition-colors"
                    style={{
                      height: `${
                        (amount / Math.max(...revenueData[timePeriod])) * 90
                      }%`,
                    }}
                  ></div>
                  <span className="text-xs mt-2">
                    {timePeriod === "day"
                      ? ["M", "T", "W", "T", "F", "S", "S"][i]
                      : timePeriod === "week"
                      ? `Week ${i + 1}`
                      : timePeriod === "month"
                      ? `M${i + 1}`
                      : timePeriod === "3month"
                      ? `Q${i + 1}`
                      : timePeriod === "6month"
                      ? `H${i + 1}`
                      : "All"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-content">
                  Total {timePeriod} revenue
                </p>
                <p className="text-2xl font-bold">
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
