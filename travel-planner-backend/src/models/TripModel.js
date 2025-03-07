const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  activity: {
    type: String,
    required: [true, 'Activity description is required']
  },
  location: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  cost: {
    type: Number,
    default: 0
  }
});
const daySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Day date is required']
  },
  events: [eventSchema]
});
const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  checkIn: {
    type: String,
    default: ''
  },
  checkOut: {
    type: String,
    default: ''
  },
  confirmation: {
    type: String,
    default: ''
  },
  cost: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  }
});
const collaboratorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['viewer', 'editor', 'owner'],
    default: 'viewer'
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});
const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  budget: {
    type: Number,
    default: 0
  },
  visibility: {
    type: String,
    enum: ['private', 'shared', 'public'],
    default: 'private'
  },
  status: {
    type: String,
    enum: ['planning', 'upcoming', 'ongoing', 'completed'],
    default: 'planning'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [collaboratorSchema],
  days: [daySchema],
  accommodation: accommodationSchema,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});
tripSchema.index({ name: 'text', destination: 'text', description: 'text' });
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip; 