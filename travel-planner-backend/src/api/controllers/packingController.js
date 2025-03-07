const PackingItem = require("../../models/PackingItemModel");
const Trip = require("../../models/TripModel");
const logger = require("../../utils/logger");
const { validationResult } = require("express-validator");
exports.createPackingItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { trip, name, category, quantity, isPacked } = req.body;
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
        message: "You do not have permission to add items to this trip",
      });
    }
    const packingItem = await PackingItem.create({
      trip,
      name,
      category: category || "Other",
      quantity: quantity || 1,
      isPacked: isPacked || false,
      createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      data: packingItem,
    });
  } catch (error) {
    logger.error(`Create packing item error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getTripPackingItems = async (req, res) => {
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
        message: "You do not have permission to view this trip's packing list",
      });
    }
    const packingItems = await PackingItem.find({ trip: tripId }).sort({
      category: 1,
      name: 1,
    });
    const groupedItems = packingItems.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
    res.status(200).json({
      success: true,
      count: packingItems.length,
      data: {
        items: packingItems,
        groupedItems,
      },
    });
  } catch (error) {
    logger.error(`Get trip packing items error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.updatePackingItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    let packingItem = await PackingItem.findById(req.params.id);
    if (!packingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Packing item not found" });
    }
    const trip = await Trip.findById(packingItem.trip);
    const isOwner = trip.owner.toString() === req.user.id;
    const isItemCreator = packingItem.createdBy.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id &&
        ["editor", "owner"].includes(collab.role)
    );
    if (!isOwner && !isItemCreator && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this item",
      });
    }
    packingItem = await PackingItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      data: packingItem,
    });
  } catch (error) {
    logger.error(`Update packing item error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.togglePackedStatus = async (req, res) => {
  try {
    let packingItem = await PackingItem.findById(req.params.id);
    if (!packingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Packing item not found" });
    }
    const trip = await Trip.findById(packingItem.trip);
    const isOwner = trip.owner.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) => collab.user.toString() === req.user.id
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this item",
      });
    }
    packingItem = await PackingItem.findByIdAndUpdate(
      req.params.id,
      { $set: { isPacked: !packingItem.isPacked } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: packingItem,
    });
  } catch (error) {
    logger.error(`Toggle packing item status error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.deletePackingItem = async (req, res) => {
  try {
    const packingItem = await PackingItem.findById(req.params.id);
    if (!packingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Packing item not found" });
    }
    const trip = await Trip.findById(packingItem.trip);
    const isOwner = trip.owner.toString() === req.user.id;
    const isItemCreator = packingItem.createdBy.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id &&
        ["editor", "owner"].includes(collab.role)
    );
    if (!isOwner && !isItemCreator && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this item",
      });
    }
    await packingItem.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Delete packing item error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.bulkCreatePackingItems = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { tripId, items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items must be a non-empty array",
      });
    }
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) =>
        collab.user.toString() === req.user.id &&
        ["editor", "owner"].includes(collab.role)
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to add items to this trip",
      });
    }
    const itemsToCreate = items.map((item) => ({
      ...item,
      trip: tripId,
      createdBy: req.user.id,
    }));
    const createdItems = await PackingItem.insertMany(itemsToCreate);
    res.status(201).json({
      success: true,
      count: createdItems.length,
      data: createdItems,
    });
  } catch (error) {
    logger.error(`Bulk create packing items error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
