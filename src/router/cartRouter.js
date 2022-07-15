const { Router } = require("express");
const logInfo = require("../../utils/logger.info");
const checkUserSession = require("../../utils/checkUserSession");

//DB archivos
// const CartContainer = require("../../cartContainer");
// const cartContainer = new CartContainer();

//DB MongoDB
const CartDaosMongo = require("../daos/cart/cartDaosMongo");
const cartDB = new CartDaosMongo();

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// const cartDB = new CartDaosFirebase();

const router = new Router();

// Carro de compras
router
  .route("/")
  .get(logInfo, checkUserSession, async (req, res) => {
    const user = req.user;
    res.render("pages/allCarts", { data: await cartDB.getAll(), user: user });
  })
  .post(async (req, res) => {
    res.render("pages/allCarts", {
      data: await cartDB.getAll(),
      saveData: await cartDB.save(),
    });
  })
  .delete(async (req, res) => {
    res.send(await cartDB.deleteAll());
  });

router
  .route("/:id?")
  .get(logInfo, checkUserSession, async (req, res) => {
    req.params.id
      ? res.render("pages/cart", { data: await cartDB.getById(req.params.id) })
      : res.send({ info: "No existe este carrito" });
  })
  .delete(async (req, res) => {
    req.params.body
      ? res.render("pages/cart", {
          delData: await cartDB.deleteById(req.params.id),
          data: await cartDB.getById(req.params.id),
        })
      : res.send({ info: "No existe este carrito" });
  });

module.exports = router;
