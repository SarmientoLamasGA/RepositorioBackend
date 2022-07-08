const { Router } = require("express");
const router = new Router();

const { createTransport } = require("nodemailer");
const MAIL = "ford.zemlak58@ethereal.email";
const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: MAIL,
    pass: "QZ6DrYP2GnUfuAztYV",
  },
});

router
  .route("/")
  .get(async (req, res) => {
    res.render("pages/contactMail");
  })
  .post(async (req, res) => {
    try {
      const mailOptions = {
        from: req.body.from,
        to: "ford.zemlak58@ethereal.email",
        subject: req.body.subject,
        text: req.body.mail,
      };
      transporter.sendMail(mailOptions);
      res.send({ info: "Enviado" });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
