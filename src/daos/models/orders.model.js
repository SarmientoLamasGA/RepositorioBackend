const { Schema } = require("mongoose");

const ordersSchema = new Schema({
  orderNumber: { type: Number, required: true, unique: true },
  UId: { type: Number, required: true },
  username: { type: String, required: true },
  contactMail: { type: String, required: true },
  productos: { type: [], required: true },
  confirmedAt: { type: Date, default: Date.now() },
});

module.exports = ordersSchema;
