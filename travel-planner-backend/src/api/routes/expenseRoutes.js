const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middlewares/auth");
const expenseController = require("../controllers/expenseController");
router.post(
  "/",
  [
    auth,
    [
      check("trip", "Trip ID is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("amount", "Amount is required and must be a number").isNumeric(),
      check("currency", "Currency is required").not().isEmpty(),
    ],
  ],
  expenseController.createExpense
);
router.get("/trip/:tripId", auth, expenseController.getTripExpenses);
router.get("/trip/:tripId/summary", auth, expenseController.getExpenseSummary);
router.get("/:id", auth, expenseController.getExpenseById);
router.put(
  "/:id",
  [
    auth,
    [
      check("category", "Category is required if provided").optional(),
      check("amount", "Amount must be a number if provided")
        .optional()
        .isNumeric(),
      check("currency", "Currency is required if provided").optional(),
    ],
  ],
  expenseController.updateExpense
);
router.delete("/:id", auth, expenseController.deleteExpense);
module.exports = router;
