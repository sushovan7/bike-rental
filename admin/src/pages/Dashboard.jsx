import React, { useState } from "react";
import axios from "axios";
import {
  FaBicycle,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState("month");

  // Sample data - replace with your actual data
  const revenueData = {
    day: [
      { name: "12AM", revenue: 400 },
      { name: "3AM", revenue: 300 },
      { name: "6AM", revenue: 600 },
      { name: "9AM", revenue: 800 },
      { name: "12PM", revenue: 1500 },
      { name: "3PM", revenue: 2000 },
      { name: "6PM", revenue: 2400 },
      { name: "9PM", revenue: 1800 },
    ],
    week: [
      { name: "Mon", revenue: 4000 },
      { name: "Tue", revenue: 3000 },
      { name: "Wed", revenue: 6000 },
      { name: "Thu", revenue: 8000 },
      { name: "Fri", revenue: 15000 },
      { name: "Sat", revenue: 20000 },
      { name: "Sun", revenue: 18000 },
    ],
    month: [
      { name: "Week 1", revenue: 40000 },
      { name: "Week 2", revenue: 30000 },
      { name: "Week 3", revenue: 60000 },
      { name: "Week 4", revenue: 80000 },
    ],
    "3month": [
      { name: "Jan", revenue: 120000 },
      { name: "Feb", revenue: 190000 },
      { name: "Mar", revenue: 150000 },
    ],
    "6month": [
      { name: "Jan", revenue: 120000 },
      { name: "Feb", revenue: 190000 },
      { name: "Mar", revenue: 150000 },
      { name: "Apr", revenue: 180000 },
      { name: "May", revenue: 210000 },
      { name: "Jun", revenue: 250000 },
    ],
    year: [
      { name: "Q1", revenue: 460000 },
      { name: "Q2", revenue: 640000 },
      { name: "Q3", revenue: 580000 },
      { name: "Q4", revenue: 720000 },
    ],
    all: [
      { name: "2020", revenue: 1200000 },
      { name: "2021", revenue: 1900000 },
      { name: "2022", revenue: 2500000 },
      { name: "2023", revenue: 3200000 },
    ],
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/dashboard-data`,
      {
        headers: { token },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const fetchDashboardBikeData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/dashboard-bike-data`,
      {
        headers: { token },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const fetchDashboardRecentTransactions = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/dashboard/dashboard-recent-transactions`,
      {
        headers: { token },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const {
    data,
    isPending: isPendingData,
    isError: isErrorData,
    error: errorData,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });
  console.log(data);

  const {
    data: bikeData,
    isPending: isPendingBike,
    isError: isErrorBike,
    error: errorBike,
  } = useQuery({
    queryKey: ["dashboardBike"],
    queryFn: fetchDashboardBikeData,
  });

  const {
    data: recentData,
    isPending: isPendingRecent,
    isError: isErrorRecent,
    error: errorRecent,
  } = useQuery({
    queryKey: ["dashboardRecentTransactions"],
    queryFn: fetchDashboardRecentTransactions,
  });
  console.log(recentData);

  if (isPendingData || isPendingBike || isPendingRecent) {
    return (
      <div className="flex justify-center items-center h-64">
        Please wait ...
      </div>
    );
  }

  if (isErrorData || isErrorBike || isErrorRecent) {
    const error = isErrorData
      ? errorData
      : isErrorBike
      ? errorBike
      : errorRecent;
    return (
      <div className="p-4 text-red-500">
        Error loading dashboard: {error.message}
      </div>
    );
  }

  const transformBikeCategories = (apiData) => {
    const categoryColors = {
      Sports: "#FF6384",
      Adventure: "#36A2EB",
      Cruiser: "#FFCE56",
      Dirt: "#4BC0C0",
      Street: "#9966FF",
      Scooter: "#FF9F40",
      Electric: "#00C957",
      Naked: "#8A2BE2",
      Touring: "#FF6B6B",
      "Cafe Racers": "#9370DB",
      "Off-Road": "#3CB371",
    };

    return (
      apiData?.categories?.map((item) => ({
        name: item.category,
        value: item.percentage,
        count: item.count,
        color: categoryColors[item.category] || "#CCCCCC",
      })) || []
    );
  };

  const bikeCategories = transformBikeCategories(bikeData);

  const stats = {
    totalRentals: data?.totalRentals || 0,
    totalSales: data?.totalSales || 0,
    totalUsers: recentData?.totalUsers || 0,
    revenue: data?.revenue || 0,
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">
          Bike Rental & Sales Dashboard
        </h1>
        <p className="text-sm text-base-content/70">
          Overview of your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Rentals",
            value: stats.totalRentals,
            change: data.changes?.rentalsChange,
            icon: <FaBicycle className="text-lg" />,
            color: "primary",
          },
          {
            title: "Total Sales",
            value: stats.totalSales,
            change: data.changes?.salesChange,
            icon: <FaMoneyBillWave className="text-lg" />,
            color: "secondary",
          },
          {
            title: "Total Users ",
            value: stats.totalUsers,
            change: data.changes?.usersChange,
            icon: <FaUsers className="text-lg" />,
            color: "accent",
          },
          {
            title: "Revenue",
            value: `Rs ${stats.revenue.toLocaleString()}`,
            change: data.changes?.revenueChange,
            icon: <FaChartLine className="text-lg" />,
            color: "info",
          },
        ].map((card, index) => (
          <div key={index} className="card bg-base-100 border border-gray-600">
            <div className="card-body p-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`rounded-full p-3 bg-${card.color}/10 text-${card.color}`}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-base-content/70">
                    {card.title}
                  </h3>
                  <p className="text-xl font-semibold">{card.value}</p>
                  <p
                    className={`text-xs ${
                      card.change >= 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {card.change >= 0 ? "↑" : "↓"} {Math.abs(card.change)}% from
                    last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 border border-gray-600">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-lg">Revenue Overview</h2>
                <select
                  className="select select-bordered select-sm max-w-xs"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="3month">3 Months</option>
                  <option value="6month">6 Months</option>
                  <option value="year">Yearly</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData[timeFrame]}
                    fill="#4f46e5"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--bc)/20)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: "#ded4d4",
                        fontSize: 12,
                      }}
                      tickMargin={10}
                    />
                    <YAxis
                      tickFormatter={(value) => `Rs. ${value.toLocaleString()}`}
                      tick={{
                        fill: "#ded4d4",
                        fontSize: 12,
                      }}
                      tickMargin={10}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `Rs. ${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                      labelFormatter={(label) => `Time Period: ${label}`}
                      contentStyle={{
                        background: "hsl(var(--b1))",
                        borderColor: "hsl(var(--b3))",
                        borderRadius: "var(--rounded-box)",
                        padding: "0.5rem 1rem",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-gray-600 overflow-hidden">
            <div className="card-body p-0">
              <div className="p-4 border-b border-base-200">
                <h2 className="card-title text-lg">Recent Transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentData?.data?.length > 0 ? (
                      recentData.data.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-10 h-10">
                                  <img src={item.userId?.avatar} alt="Avatar" />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="font-bold">
                                {item.userId?.firstName} {item.userId?.lastName}
                              </div>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="text-sm text-base-content/70">
                              {item.address?.city} {item.address?.street}
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                item.rentalDuration
                                  ? "badge-primary"
                                  : "badge-secondary"
                              }`}
                            >
                              {item.rentalDuration ? "Rent" : "Sale"}
                            </span>
                          </td>
                          <td>Rs. {item.amount}</td>
                          <td>{item.paymentMethod}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.paymentStatus === "paid"
                                  ? "badge-success"
                                  : "badge-warning"
                              }`}
                            >
                              {item.paymentStatus}
                            </span>
                          </td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-base-content/70"
                        >
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-base-100 border border-gray-600">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-4">Bike Categories</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <Pie
                      data={bikeCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      innerRadius={30}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => (
                        <text
                          x={0}
                          y={0}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#333"
                          fontSize={12}
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      )}
                      labelLine={false}
                    >
                      {bikeCategories.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-base-200 p-4 rounded-lg shadow-lg border border-base-300">
                              <p className="font-bold text-base-content">
                                {payload[0].name}
                              </p>
                              <div className="flex justify-between gap-4">
                                <span className="text-base-content/70">
                                  Percentage:
                                </span>
                                <span className="font-medium">
                                  {payload[0].value}%
                                </span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-base-content/70">
                                  Total Bikes:
                                </span>
                                <span className="font-medium">
                                  {payload[0].payload.count}
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{
                        paddingLeft: "20px",
                      }}
                      formatter={(value, entry, index) => (
                        <span className="text-xs">
                          {value} ({bikeCategories[index]?.count || 0})
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-gray-600">
            <div className="card-body">
              <h2 className="card-title text-lg">Rental vs Sales</h2>
              <div className="space-y-4">
                <div className="flex justify-around items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stats.totalRentals}
                    </div>
                    <div className="text-sm text-base-content/70">
                      Total Rentals
                    </div>
                  </div>
                  <div className="divider divider-horizontal">VS</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">
                      {stats.totalSales}
                    </div>
                    <div className="text-sm text-base-content/70">
                      Total Sales
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-base-content/70 badge badge-primary">
                        Rental Revenue
                      </span>
                      <span className="font-medium ">
                        Rs {data.breakdown.rentalRevenue}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <div className="text-base-content/70 badge badge-secondary">
                        Sales Revenue
                      </div>
                      <span className="font-medium">
                        Rs {data.breakdown.salesRevenue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
