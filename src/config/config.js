require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "127.0.0.1",
  MONGODB_SESSION: process.env.MONGODB_SESSION,
  MONGODB_CONTAINERMONGO: process.env.MONGODB_CONTAINERMONGO,
};
