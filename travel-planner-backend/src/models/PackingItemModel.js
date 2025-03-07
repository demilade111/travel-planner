const mongoose = require('mongoose');
const packingItemSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['documents', 'clothing', 'toiletries', 'electronics', 'medical', 'misc'],
    default: 'misc'
  },
  quantity: {
    type: Number,
    default: 1
  },
  packed: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
const PackingItem = mongoose.model('PackingItem', packingItemSchema);
module.exports = PackingItem; 