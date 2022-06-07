const { Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = UserSchema;
