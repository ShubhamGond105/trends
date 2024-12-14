const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  bgColor: {
    type: String
  },
  panelColor: {
    type: String
  },
  textColor: {
    type: String
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
