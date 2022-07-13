const { Schema } = require("mongoose");

const cartSchema = new Schema({
  UId: { type: Number },
  userName: { type: String },
  productos: { type: [], required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = cartSchema;
