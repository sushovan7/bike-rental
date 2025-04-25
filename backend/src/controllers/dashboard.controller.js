import { orderModel } from "../models/order.models.js";
import { productModel } from "../models/product.models.js";
import { userModel } from "../models/user.models.js";

export async function getDashboardData(req, res) {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Current month date range
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    // Previous month date range
    const startOfPrevMonth = new Date(currentYear, currentMonth - 2, 1);
    const endOfPrevMonth = new Date(
      currentYear,
      currentMonth - 1,
      0,
      23,
      59,
      59,
      999
    );

    // Current month aggregation
    const currentMonthPipeline = [
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $facet: {
          rentals: [
            { $match: { rentalDuration: { $exists: true } } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
          sales: [
            { $match: { rentalDuration: { $exists: false } } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalRentals: {
            $ifNull: [{ $arrayElemAt: ["$rentals.count", 0] }, 0],
          },
          rentalRevenue: {
            $ifNull: [{ $arrayElemAt: ["$rentals.totalAmount", 0] }, 0],
          },
          totalSales: { $ifNull: [{ $arrayElemAt: ["$sales.count", 0] }, 0] },
          salesRevenue: {
            $ifNull: [{ $arrayElemAt: ["$sales.totalAmount", 0] }, 0],
          },
        },
      },
    ];

    // Previous month aggregation
    const prevMonthPipeline = [
      {
        $match: {
          createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
        },
      },
      {
        $facet: {
          rentals: [
            { $match: { rentalDuration: { $exists: true } } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
          sales: [
            { $match: { rentalDuration: { $exists: false } } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
        },
      },
      {
        $project: {
          prevTotalRentals: {
            $ifNull: [{ $arrayElemAt: ["$rentals.count", 0] }, 0],
          },
          prevRentalRevenue: {
            $ifNull: [{ $arrayElemAt: ["$rentals.totalAmount", 0] }, 0],
          },
          prevTotalSales: {
            $ifNull: [{ $arrayElemAt: ["$sales.count", 0] }, 0],
          },
          prevSalesRevenue: {
            $ifNull: [{ $arrayElemAt: ["$sales.totalAmount", 0] }, 0],
          },
        },
      },
    ];

    // Active users calculation (current and previous month)
    const activeUsersPipeline = [
      {
        $facet: {
          currentActiveUsers: [
            {
              $match: {
                lastActive: { $gte: startOfMonth, $lte: endOfMonth },
              },
            },
            { $count: "count" },
          ],
          prevActiveUsers: [
            {
              $match: {
                lastActive: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          currentActiveUsers: {
            $ifNull: [{ $arrayElemAt: ["$currentActiveUsers.count", 0] }, 0],
          },
          prevActiveUsers: {
            $ifNull: [{ $arrayElemAt: ["$prevActiveUsers.count", 0] }, 0],
          },
        },
      },
    ];

    // Execute all pipelines in parallel
    const [currentData, prevData, usersData] = await Promise.all([
      orderModel.aggregate(currentMonthPipeline),
      orderModel.aggregate(prevMonthPipeline),
      userModel.aggregate(activeUsersPipeline),
    ]);

    const current = currentData[0] || {
      totalRentals: 0,
      rentalRevenue: 0,
      totalSales: 0,
      salesRevenue: 0,
    };

    const prev = prevData[0] || {
      prevTotalRentals: 0,
      prevRentalRevenue: 0,
      prevTotalSales: 0,
      prevSalesRevenue: 0,
    };

    const users = usersData[0] || {
      currentActiveUsers: 0,
      prevActiveUsers: 0,
    };

    // Calculate percentage changes
    const calculateChange = (currentVal, prevVal) => {
      if (prevVal === 0) {
        return currentVal === 0 ? 0 : 100; // Handle division by zero
      }
      return ((currentVal - prevVal) / prevVal) * 100;
    };

    // Prepare response
    const responseData = {
      totalRentals: current.totalRentals,
      totalSales: current.totalSales,
      activeUsers: users.currentActiveUsers,
      revenue: current.rentalRevenue + current.salesRevenue,
      changes: {
        rentalsChange: calculateChange(
          current.totalRentals,
          prev.prevTotalRentals
        ),
        salesChange: calculateChange(current.totalSales, prev.prevTotalSales),
        usersChange: calculateChange(
          users.currentActiveUsers,
          users.prevActiveUsers
        ),
        revenueChange: calculateChange(
          current.rentalRevenue + current.salesRevenue,
          prev.prevRentalRevenue + prev.prevSalesRevenue
        ),
      },
      breakdown: {
        rentalRevenue: current.rentalRevenue,
        salesRevenue: current.salesRevenue,
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}

export async function getDashboardBikeData(req, res) {
  try {
    const bikeCategories = [
      "Dirt",
      "Adventure",
      "Street",
      "Cruiser",
      "Sports",
      "Scooter",
      "Electric",
      "Naked",
      "Touring",
      "Cafe Racers",
      "Off-Road",
    ];

    // Pipeline to calculate bike distribution by category
    const pipeline = [
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    // Execute aggregation
    const categoryCounts = await productModel.aggregate(pipeline);

    // Get total bike count
    const totalBikes = await productModel.countDocuments();

    // Format response with all categories
    const response = bikeCategories.map((category) => {
      const foundCategory = categoryCounts.find((c) => c.category === category);
      const count = foundCategory ? foundCategory.count : 0;
      const percentage =
        totalBikes > 0 ? ((count / totalBikes) * 100).toFixed(1) : 0;

      return {
        category,
        count,
        percentage: parseFloat(percentage),
      };
    });

    res.json({
      success: true,
      totalBikes,
      categories: response,
    });
  } catch (error) {
    console.error("Error in getDashboardBikeData:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

export async function getDashboardRecentTransactions(req, res) {
  try {
    const [recentOrders, totalUsers] = await Promise.all([
      orderModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "firstName lastName email avatar")
        .populate("bike", "bikeName model brandName yearOfManufacture"),
      userModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "Recent transactions fetched successfully",
      data: recentOrders,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching recent transactions",
    });
  }
}
