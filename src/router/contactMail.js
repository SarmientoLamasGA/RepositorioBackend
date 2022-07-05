const { Router } = require("express");
const transporter = require("../../utils/nodemailer.transporter");

const router = new Router();

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

router.route("/enviar").get(async (req, res) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    res.send("enviado");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
