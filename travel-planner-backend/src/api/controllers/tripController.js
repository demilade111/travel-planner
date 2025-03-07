const Trip = require('../../models/TripModel');
const logger = require('../../utils/logger');
const { validationResult } = require('express-validator');
exports.createTrip = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const {
      name,
      destination,
      startDate,
      endDate,
      description,
      budget,
      visibility,
      days,
      accommodation
    } = req.body;
    const trip = await Trip.create({
      name,
      destination,
      startDate,
      endDate,
      description: description || '',
      image: req.body.image || '',
      budget: budget || 0,
      visibility: visibility || 'private',
      status: 'planning',
      owner: req.user.id,
      days: days || [],
      accommodation: accommodation || {}
    });
    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error(`Create trip error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({
      $or: [
        { owner: req.user.id },
        { 'collaborators.user': req.user.id }
      ]
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    logger.error(`Get trips error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('owner', 'firstName lastName email avatar')
      .populate('collaborators.user', 'firstName lastName email avatar');
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const isOwner = trip.owner._id.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      collaborator => collaborator.user._id.toString() === req.user.id
    );
    if (!isOwner && !isCollaborator && trip.visibility === 'private') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this trip' });
    }
    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error(`Get trip error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isEditorCollaborator = trip.collaborators.some(
      collaborator => collaborator.user.toString() === req.user.id && 
                    (collaborator.role === 'editor' || collaborator.role === 'owner')
    );
    if (!isOwner && !isEditorCollaborator) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this trip' });
    }
    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error(`Update trip error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    if (trip.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this trip' });
    }
    await trip.remove();
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Delete trip error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.addDay = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { date, events } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isEditorCollaborator = trip.collaborators.some(
      collaborator => collaborator.user.toString() === req.user.id && 
                    (collaborator.role === 'editor' || collaborator.role === 'owner')
    );
    if (!isOwner && !isEditorCollaborator) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this trip' });
    }
    trip.days.push({
      date,
      events: events || []
    });
    await trip.save();
    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error(`Add day error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.updateDay = async (req, res, next) => {
  try {
    const { date, events } = req.body;
    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isEditorCollaborator = trip.collaborators.some(
      collaborator => collaborator.user.toString() === req.user.id && 
                    (collaborator.role === 'editor' || collaborator.role === 'owner')
    );
    if (!isOwner && !isEditorCollaborator) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this trip' });
    }
    const dayIndex = trip.days.findIndex(day => day._id.toString() === req.params.dayId);
    if (dayIndex === -1) {
      return res.status(404).json({ success: false, message: 'Day not found' });
    }
    if (date) trip.days[dayIndex].date = date;
    if (events) trip.days[dayIndex].events = events;
    await trip.save();
    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error(`Update day error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.deleteDay = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const isOwner = trip.owner.toString() === req.user.id;
    const isEditorCollaborator = trip.collaborators.some(
      collaborator => collaborator.user.toString() === req.user.id && 
                    (collaborator.role === 'editor' || collaborator.role === 'owner')
    );
    if (!isOwner && !isEditorCollaborator) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this trip' });
    }
    const dayIndex = trip.days.findIndex(day => day._id.toString() === req.params.dayId);
    if (dayIndex === -1) {
      return res.status(404).json({ success: false, message: 'Day not found' });
    }
    trip.days.splice(dayIndex, 1);
    await trip.save();
    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error(`Delete day error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 