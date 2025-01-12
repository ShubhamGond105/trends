const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  contact: {
    type: Number
  },
  picture: {
    type: String
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

