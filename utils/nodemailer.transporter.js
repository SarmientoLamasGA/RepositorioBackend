const { createTransport } = require("nodemailer");

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ford.zemlak58@ethereal.email",
    pass: "QZ6DrYP2GnUfuAztYV",
  },
});

module.exports = transporter;
