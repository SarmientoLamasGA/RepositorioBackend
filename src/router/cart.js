const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const checkUserSession = require("../middlewares/checkUserSession");

//DB
const CartsFactory = require("../factory/cartFactory");
const cartsFact = new CartsFactory();
const cartDB = cartsFact.create();

const OrdersFactory = require("../factory/ordersFactory");
const ordersFact = new OrdersFactory();
const ordersDB = ordersFact.create();

//EMAIL
const { createTransport } = require("nodemailer");
const MAIL = "shawn.dubuque13@ethereal.email";
const transporter = createTransport({
  name: "shawn.dubuque13@ethereal.email",
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: MAIL,
    pass: "9Q2nBhv9wSZHWYaHHt",
  },
});

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
    const user = req.user;
    const email = user.email;
    const contact = {
      name: req.body.name,
      lastName: req.body.lastname,
      email: req.body.email,
    };

    const mailOptions = {
      from: `${contact.email}`,
      to: `${MAIL}`,
      subject: "Compra aceptada",
      text: "Compra Confirmada",
      html: "<p>Compra realizada!</p>",
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log({ error: "error", message: err });
      } else {
        console.log({ info: info });
      }
    });

    const order = await ordersDB.saveOrder(cart, email);
    res.send(order);
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
