const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const checkUserSession = require("../middlewares/checkUserSession");

//DB archivos
// const CartContainer = require("../../cartContainer");
// const cartContainer = new CartContainer();

//DB MongoDB
const CartsFactory = require("../factory/cartFactory");
const factory = new CartsFactory();
const cartDB = factory.create();

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// const cartDB = new CartDaosFirebase();

const router = new Router();

// Carro de compras
// router.route("/").get(logInfo, checkUserSession, async (req, res) => {
//   const user = req.user;
//   if (user.admin) {
//     res.render("pages/allCarts", { data: await cartDB.getAll(), user: user });
//   } else {
//     res.redirect("/api/usuario/sesion");
//   }
// });

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
    // req.params.body
    //   ? res.render("pages/cart", {
    //       delData: await cartDB.deleteById(req.params.id),
    //       data: await cartDB.getById(req.params.id),
    //     })
    //   : res.send({ info: "No existe este carrito" });
    const user = req.user;
    const userUId = user.UId;
    const cart = await cartDB.getById(userUId);
    await cartDB.deleteFromCart(cart, userUId, req.body.UId);
    res.render("pages/cart", { data: await cartDB.getById(userUId), user });
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
