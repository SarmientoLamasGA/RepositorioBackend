const { Router } = require("express");

//DB archivos
// const CartContainer = require("../../cartContainer");
// const cartContainer = new CartContainer();

//DB MongoDB
const CartDaosMongo = require("../daos/cart/cartDaosMongo");
const cartDB = new CartDaosMongo();

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// cartDB = CartDaosFirebase();

const router = new Router();

const admin = true;

// Carro de compras
router
  .route("/")
  .get(async (req, res) => {
    res.send(await cartDB.getAll());
  })
  .post(async (req, res) => {
    res.send(await cartDB.save());
  })
  .delete(async (req, res) => {
    res.send(await cartDB.deleteAll());
  });

router
  .route("/:id?")
  .get(async (req, res) => {
    req.params.id
      ? res.send(await cartDB.getById(req.params.id))
      : res.send({ info: "No existe este carrito" });
  })
  .delete(async (req, res) => {
    req.params.id
      ? res.send(await cartDB.deleteById(req.params.id))
      : res.send({ info: "No existe este carrito" });
  });

module.exports = router;
