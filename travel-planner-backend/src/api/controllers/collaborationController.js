const Trip = require("../../models/TripModel");
const User = require("../../models/UserModel");
const logger = require("../../utils/logger");
const { validationResult } = require("express-validator");
const sendEmail = require("../../utils/email");
exports.addCollaborator = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, role } = req.body;
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    if (trip.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only the trip owner can add collaborators",
      });
    }
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isAlreadyCollaborator = trip.collaborators.some(
      (collab) => collab.user.toString() === userToAdd._id.toString()
    );
    if (isAlreadyCollaborator) {
      return res.status(400).json({
        success: false,
        message: "User is already a collaborator on this trip",
      });
    }
    if (trip.owner.toString() === userToAdd._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Owner cannot be added as a collaborator",
      });
    }
    trip.collaborators.push({
      user: userToAdd._id,
      role: role || "viewer",
      addedAt: Date.now(),
    });
    await trip.save();
    const emailOptions = {
      email: userToAdd.email,
      subject: `You've been added to a trip: ${trip.name}`,
      message: `Hello ${userToAdd.name},\n\nYou have been added as a ${
        role || "viewer"
      } to the trip "${trip.name}" by ${
        req.user.name
      }.\n\nYou can now view and interact with this trip in your Travel Planner account.\n\nRegards,\nTravel Planner Team`,
    };
    sendEmail(emailOptions).catch((err) =>
      logger.error(
        `Error sending collaborator notification email: ${err.message}`
      )
    );
    const updatedTrip = await Trip.findById(tripId)
      .populate("owner", "name email")
      .populate("collaborators.user", "name email");
    res.status(200).json({
      success: true,
      data: updatedTrip,
    });
  } catch (error) {
    logger.error(`Add collaborator error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.removeCollaborator = async (req, res) => {
  try {
    const { tripId, userId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    if (trip.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only the trip owner can remove collaborators",
      });
    }
    const collaboratorIndex = trip.collaborators.findIndex(
      (collab) => collab.user.toString() === userId
    );
    if (collaboratorIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User is not a collaborator on this trip",
      });
    }
    trip.collaborators.splice(collaboratorIndex, 1);
    await trip.save();
    const removedUser = await User.findById(userId);
    if (removedUser) {
      const emailOptions = {
        email: removedUser.email,
        subject: `You've been removed from a trip: ${trip.name}`,
        message: `Hello ${removedUser.name},\n\nYou have been removed from the trip "${trip.name}" by ${req.user.name}.\n\nYou will no longer have access to view or interact with this trip.\n\nRegards,\nTravel Planner Team`,
      };
      sendEmail(emailOptions).catch((err) =>
        logger.error(`Error sending collaborator removal email: ${err.message}`)
      );
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Remove collaborator error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.updateCollaboratorRole = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { role } = req.body;
    const { tripId, userId } = req.params;
    if (!["viewer", "editor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either "viewer" or "editor"',
      });
    }
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    if (trip.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only the trip owner can update collaborator roles",
      });
    }
    const collaborator = trip.collaborators.find(
      (collab) => collab.user.toString() === userId
    );
    if (!collaborator) {
      return res.status(404).json({
        success: false,
        message: "User is not a collaborator on this trip",
      });
    }
    collaborator.role = role;
    await trip.save();
    const updatedTrip = await Trip.findById(tripId)
      .populate("owner", "name email")
      .populate("collaborators.user", "name email");
    res.status(200).json({
      success: true,
      data: updatedTrip,
    });
  } catch (error) {
    logger.error(`Update collaborator role error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getCollaborators = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId)
      .populate("owner", "name email")
      .populate("collaborators.user", "name email");
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    const isOwner = trip.owner._id.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (collab) => collab.user._id.toString() === req.user.id
    );
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view this trip's collaborators",
      });
    }
    const collaborators = [
      {
        user: {
          _id: trip.owner._id,
          name: trip.owner.name,
          email: trip.owner.email,
        },
        role: "owner",
        addedAt: trip.createdAt,
      },
      ...trip.collaborators.map((collab) => ({
        user: {
          _id: collab.user._id,
          name: collab.user.name,
          email: collab.user.email,
        },
        role: collab.role,
        addedAt: collab.addedAt,
      })),
    ];
    res.status(200).json({
      success: true,
      data: collaborators,
    });
  } catch (error) {
    logger.error(`Get collaborators error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.leaveTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }
    if (trip.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message:
          "Trip owner cannot leave the trip. Transfer ownership or delete the trip instead.",
      });
    }
    const collaboratorIndex = trip.collaborators.findIndex(
      (collab) => collab.user.toString() === req.user.id
    );
    if (collaboratorIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "You are not a collaborator on this trip",
      });
    }
    trip.collaborators.splice(collaboratorIndex, 1);
    await trip.save();
    const owner = await User.findById(trip.owner);
    if (owner) {
      const emailOptions = {
        email: owner.email,
        subject: `A collaborator has left your trip: ${trip.name}`,
        message: `Hello ${owner.name},\n\n${req.user.name} has left your trip "${trip.name}".\n\nThey will no longer have access to view or interact with this trip.\n\nRegards,\nTravel Planner Team`,
      };
      sendEmail(emailOptions).catch((err) =>
        logger.error(
          `Error sending collaborator leaving notification: ${err.message}`
        )
      );
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error(`Leave trip error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
