const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  category: {
    type: String,
    enum: ['accommodation', 'food', 'transportation', 'activities', 'shopping', 'flights', 'coffee', 'other'],
    default: 'other'
  },
  date: {
    type: Date,
    default: Date.now
  },
  paidBy: {
    type: String,
    required: [true, 'Paid by is required']
  },
  sharedWith: [{
    user: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  receipt: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense; 