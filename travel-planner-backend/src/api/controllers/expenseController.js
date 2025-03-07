const Expense = require("../../models/ExpenseModel");
const Trip = require("../../models/TripModel");
const logger = require("../../utils/logger");
const { validationResult } = require("express-validator");
exports.createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const {
      trip,
      category,
      amount,
      currency,
      date,
      description,
      paidBy,
      splitBetween,
    } = req.body;
    const tripRecord = await Trip.findById(trip);
    if (!tripRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    const isOwner = tripRecord.owner.toString() === req.user.id;
    const isCollaborator = tripRecord.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id &&
        ["editor", "owner"].includes(collab.role)
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to add expenses to this trip",
      });
    }
    const expense = await Expense.create({
      trip,
      category,
      amount,
      currency,
      date: date || new Date(),
      description: description || "",
      paidBy: paidBy || req.user.id,
      splitBetween: splitBetween || [req.user.id],
      createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    logger.error(`Create expense error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getTripExpenses = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) => collab.user.toString() === req.user.id
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view this trip's expenses",
      });
    }
    const expenses = await Expense.find({ trip: tripId }).populate(
      "paidBy splitBetween",
      "name email"
    );
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    logger.error(`Get trip expenses error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate("trip", "name destination")
      .populate("paidBy splitBetween", "name email");
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    const trip = await Trip.findById(expense.trip);
    const isOwner = trip.owner.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) => collab.user.toString() === req.user.id
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view this expense",
      });
    }
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    logger.error(`Get expense by ID error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.updateExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    const trip = await Trip.findById(expense.trip);
    const isOwner = trip.owner.toString() === req.user.id;
    const isExpenseCreator = expense.createdBy.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id &&
        ["editor", "owner"].includes(collab.role)
    );
    if (!isOwner && !isExpenseCreator && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this expense",
      });
    }
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    logger.error(`Update expense error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    const trip = await Trip.findById(expense.trip);
    const isOwner = trip.owner.toString() === req.user.id;
    const isExpenseCreator = expense.createdBy.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id &&
        ["editor", "owner"].includes(collab.role)
    );
    if (!isOwner && !isExpenseCreator && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this expense",
      });
    }
    await expense.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Delete expense error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getExpenseSummary = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) => collab.user.toString() === req.user.id
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view this trip's expenses",
      });
    }
    const totalExpenses = await Expense.aggregate([
      { $match: { trip: trip._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const expensesByCategory = await Expense.aggregate([
      { $match: { trip: trip._id } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);
    const expensesByUser = await Expense.aggregate([
      { $match: { trip: trip._id } },
      { $group: { _id: "$paidBy", total: { $sum: "$amount" } } },
    ]);
    const populatedExpensesByUser = await Promise.all(
      expensesByUser.map(async (item) => {
        const user = await User.findById(item._id).select("name email");
        return {
          user,
          total: item.total,
        };
      })
    );
    res.status(200).json({
      success: true,
      data: {
        total: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
        byCategory: expensesByCategory,
        byUser: populatedExpensesByUser,
      },
    });
  } catch (error) {
    logger.error(`Get expense summary error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
