const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income last 60 days
    const last60DayIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DayIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Income last 30 days
    const last30DayIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast30Days = last30DayIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Expense last 60 days
    const last60DayExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast60Days = last60DayExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Expense last 30 days
    const last30DayExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DayExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Recent transactions (last 5 income + last 5 expense)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DayExpenseTransactions,
      },
      last60DaysExpense: {
        total: expenseLast60Days,
        transactions: last60DayExpenseTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
