const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const auth = require("../middlewares/auth");
const checkUserSession = require("../middlewares/checkUserSession");

//DB
const CartController = require("../controllers/cart.controller");
const cartController = new CartController();

const router = new Router();

router
  .route("/")
  .get(logInfo, checkUserSession, cartController.getCartById) //Se obtiene el carrito
  .post(logInfo, checkUserSession, auth, cartController.deleteFromCart) //Se borra producto del carrito SOLO DESDE VISTAS
  .delete(logInfo, checkUserSession, auth, cartController.deleteFromCart); //Lo mismo que el POST pero desde el DELETE

router
  .route("/:idCart/checkout")
  .get(logInfo, cartController.checkOut) //Se va al checkOut para confirmar compra
  .post(checkUserSession, cartController.confirmOrder); //Se confirma y guarda la compra, se vacía el carrito y se envía mail confirmando compra

router
  .route("/todos")
  .get(logInfo, checkUserSession, auth, cartController.getAllCarts); //Se muestran todos los carritos existentes

module.exports = router;
