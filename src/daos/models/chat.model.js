const { Schema } = require("mongoose");

const chatSchema = new Schema({
  UId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, requier: true },
  messages: { type: [], default: [] },
});

module.exports = chatSchema;
