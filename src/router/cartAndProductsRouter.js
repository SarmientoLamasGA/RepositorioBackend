const { Router } = require("express");
const checkUserSession = require("../middlewares/checkUserSession");

//DB MongoDB
const CartDaosMongo = require("../daos/cart/cartDaosMongo.js");
const cartDB = new CartDaosMongo();

const ProductsDaosMongo = require("../daos/products/productsDaosMongo.js");
const productsDB = new ProductsDaosMongo();

//EMAIL
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

//WHATSAPP
const twilio = require("twilio");

const accountSid = "AC709d1d5230e8bb894d5e20efef592320";
const authToken = "ee6d0b047eeb4029fd0ad6a67dbd78eb";

const client = twilio(accountSid, authToken);

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// const cartDB = new CartDaosFirebase();

// const ProductsDaosFirebase = require("../daos/products/productDaosFirebase");
// const productsDB = new ProductsDaosFirebase();

const router = new Router();

// router.route("/:idCart/:idProd").post(async (req, res) => {
//   try {
//     const cart = await cartDB.getById(req.params.idCart);
//     const idCart = req.params.idCart;
//     const prod = await productsDB.getById(req.params.idProd);

//     res.send(await cartDB.addToCart(cart, prod, idCart));
//   } catch (err) {
//     console.log(err);
//   }
// });

router.route("/:idCart/delete/:idProd").delete(async (req, res) => {
  console.log("borrando");
  const cart = await cartDB.getById(req.params.idCart);
  const idCart = req.params.idCart;
  const idProd = req.params.idProd;

  //Mongo

  // const prodIndex = cart.productos.findIndex(
  //   (p) => p._id.valueOf() === req.params.idProd
  // );

  // if (prodIndex !== -1) {
  //   cart.productos.splice(prodIndex, 1);
  //   await cartDB.update(req.params.idCart, cart);
  //   res.send(await cartDB.getById(req.params.idCart));
  // } else {
  //   res.send({ Info: `El elemento a eliminar no existe` });
  // }

  res.render("pages/cart", {
    delData: await cartDB.deleteFromCart(cart, idCart, idProd),
    data: getById(idCart),
  });
});

router
  .route("/:idCart/checkout")
  .get(checkUserSession, async (req, res) => {
    const cart = await cartDB.getById(req.params.idCart);
    const totalPrice = cart.productos.reduce((a, b) => a + b.price, 0);

    res.render("pages/checkout", { data: cart, totalPrice: totalPrice });
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

module.exports = router;
