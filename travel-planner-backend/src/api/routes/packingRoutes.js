const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middlewares/auth");
const packingController = require("../controllers/packingController");
router.post(
  "/",
  [
    auth,
    [
      check("trip", "Trip ID is required").not().isEmpty(),
      check("name", "Item name is required").not().isEmpty(),
    ],
  ],
  packingController.createPackingItem
);
router.post(
  "/bulk",
  [
    auth,
    [
      check("tripId", "Trip ID is required").not().isEmpty(),
      check("items", "Items array is required").isArray(),
    ],
  ],
  packingController.bulkCreatePackingItems
);
router.get("/trip/:tripId", auth, packingController.getTripPackingItems);
router.put(
  "/:id",
  [
    auth,
    [
      check("name", "Name is required if provided").optional(),
      check("category", "Category is required if provided").optional(),
      check("quantity", "Quantity must be a number if provided")
        .optional()
        .isNumeric(),
    ],
  ],
  packingController.updatePackingItem
);
router.patch("/:id/toggle", auth, packingController.togglePackedStatus);
router.delete("/:id", auth, packingController.deletePackingItem);
module.exports = router;
