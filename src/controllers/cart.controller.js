const CartService = require("../services/cart.service");
const cartDB = new CartService();
const OrderService = require("../services/orders.service");
const ordersDB = new OrderService();

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

class CartController {
  async getCartById(req, res) {
    {
      try {
        const user = req.user;
        const userUId = user.UId;
        res.render("pages/cart", { data: await cartDB.getById(userUId), user });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async deleteFromCart(req, res) {
    {
      const user = req.user;
      const userUId = user.UId;
      const cart = await cartDB.getById(userUId);
      await cartDB.deleteFromCart(cart, userUId, req.body.UId);
      res.render("pages/cart", { data: await cartDB.getById(userUId), user });
    }
  }
  async checkOut(req, res) {
    {
      const user = req.user;
      const cart = await cartDB.getById(req.params.idCart);
      const totalPrice = cart.productos.reduce((a, b) => a + b.price, 0);

      res.render("pages/checkout", {
        data: cart,
        totalPrice: totalPrice,
        user,
      });
    }
  }
  async confirmOrder(req, res) {
    {
      const cart = await cartDB.getById(req.params.idCart);
      const user = req.user;
      const email = user.email;
      const contact = {
        name: req.body.name,
        lastName: req.body.lastname,
        email: req.body.email,
      };

      const totalPrice = cart.productos.reduce((a, b) => a + b.price, 0);

      const mailOptions = {
        from: `${contact.email}`,
        to: `${MAIL}`,
        subject: "Compra aceptada",
        text: `Se confirmó la compra de ${contact.name} ${contact.lastName}`,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log({ error: "error", message: err });
        } else {
          console.log({ info: info });
        }
      });
      const order = await ordersDB.saveOrder(cart, user, email);
      // await cartDB.emptyCart(cart.UId, cart);
      res.render("pages/order", { order, user, totalPrice });
    }
  }
  async getAllCarts(req, res) {
    {
      const user = req.user;
      if (user.admin) {
        res.render("pages/allCarts", { data: await cartDB.getAll(), user });
      } else {
        res.redirect("/api/usuario/sesion");
      }
    }
  }
}

module.exports = CartController;
