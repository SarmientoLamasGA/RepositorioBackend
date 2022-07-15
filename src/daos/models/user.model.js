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
  },
  password: {
    type: String,
    required: true,
  },
  UId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  estate: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm2xwmXA30O0RMJuturWCgjsMvZDlg7Jzim93BIJ9MgL1PWJMlFwGxCCFpOQUpx5EflMg&usqp=CAU",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = UserSchema;
