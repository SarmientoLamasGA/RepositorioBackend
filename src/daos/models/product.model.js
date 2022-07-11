const { Schema } = require("mongoose");

const prodSchema = new Schema({
  UId: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = prodSchema;
