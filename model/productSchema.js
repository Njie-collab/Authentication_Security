const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    unique: true,
  },
  serial: {
    type: String,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
