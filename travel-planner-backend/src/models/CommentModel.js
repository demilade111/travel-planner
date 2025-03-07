const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true
  },
  eventId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment; 