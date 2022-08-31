const { Schema } = require("mongoose");

const prodSchema = new Schema({
  UId: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "productos" },
  stock: { type: Number, required: true, default: 5000 },
  createdAt: { type: Date, default: new Date() },
});

module.exports = prodSchema;
