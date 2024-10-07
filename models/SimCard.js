
const mongoose = require('mongoose');

const simCardSchema = new mongoose.Schema({
  simNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  activationDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

simCardSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'active' && !this.activationDate) {
    this.activationDate = new Date();
  }
  next();
});

const SimCard = mongoose.model('SimCard', simCardSchema);

module.exports = SimCard;