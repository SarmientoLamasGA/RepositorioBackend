const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const checkUserSession = require("../middlewares/checkUserSession");

//DB
const CartsFactory = require("../factory/cartFactory");
const factory = new CartsFactory();
const cartDB = factory.create();

const router = new Router();

router
  .route("/")
  .get(logInfo, checkUserSession, async (req, res) => {
    try {
      const user = req.user;
      const userUId = user.UId;
      res.render("pages/cart", { data: await cartDB.getById(userUId), user });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    const user = req.user;
    const userUId = user.UId;
    const cart = await cartDB.getById(userUId);
    await cartDB.deleteFromCart(cart, userUId, req.body.UId);
    res.render("pages/cart", { data: await cartDB.getById(userUId), user });
  });

router
  .route("/:idCart/checkout")
  .get(checkUserSession, async (req, res) => {
    const user = req.user;
    const cart = await cartDB.getById(req.params.idCart);
    const totalPrice = cart.productos.reduce((a, b) => a + b.price, 0);

    res.render("pages/checkout", { data: cart, totalPrice: totalPrice, user });
  })
  .post(async (req, res) => {
    const cart = await cartDB.getById(req.params.idCart);
    const contact = {
      name: req.body.name,
      lastName: req.body.lastname,
      phone: `+549${req.body.phone}`,
      email: req.body.email,
    };

    client.messages
      .create({
        body: "Compra confirmada",
        from: "whatsapp:+14155238886",
        to: `whatsapp:${contact.phone}`,
      })
      .then((message) => console.log(`Message sid: ${message.sid}`))
      .done();

    const mailOptions = {
      from: "Compra en backend",
      to: `${contact.email}`,
      subject: "Compra aceptada",
      text: "Compra Confirmada",
    };
    transporter.sendMail(mailOptions);

    res.send(contact);
  });

router.route("/todos").get(logInfo, checkUserSession, async (req, res) => {
  const user = req.user;
  if (user.admin) {
    res.render("pages/allCarts", { data: await cartDB.getAll(), user });
  } else {
    res.redirect("/api/usuario/sesion");
  }
});

module.exports = router;
