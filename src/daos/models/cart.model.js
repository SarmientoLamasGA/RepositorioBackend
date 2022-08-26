const { Schema } = require("mongoose");

const cartSchema = new Schema({
  UId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  productos: { type: [], required: true, default: [] },
  history: { type: [], default: [] },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = cartSchema;
