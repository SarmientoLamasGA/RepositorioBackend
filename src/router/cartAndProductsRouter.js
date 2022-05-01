const { Router } = require("express");

//DB MongoDB
const CartDaosMongo = require("../daos/cart/cartDaosMongo.js");
const cartDB = new CartDaosMongo();

const ProductsDaosMongo = require("../daos/products/productsDaosMongo.js");
const productsDB = new ProductsDaosMongo();

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// cartContainer = CartDaosFirebase();

const router = new Router();

router.route("/:idCart/:idProd").post(async (req, res) => {
  const cart = await cartDB.getById(req.params.idCart);
  const prod = await productsDB.getById(req.params.idProd);

  if (
    cart._id.valueOf() === req.params.idCart &&
    prod._id.valueOf() === req.params.idProd
  ) {
    prod.sent = Date.now();
    await cart.productos.push(prod);
    await cartDB.update(cart._id, cart);
    res.send(await cartDB.getById(req.params.idCart));
  } else {
    res.send({ Info: "El elemento no existe" });
  }
});

router.route("/:idCart/:idProd").delete(async (req, res) => {
  const cart = await cartDB.getById(req.params.idCart);

  const prodIndex = cart.productos.findIndex(
    (p) => p._id.valueOf() === req.params.idProd
  );

  if (prodIndex !== -1) {
    cart.productos.splice(prodIndex, 1);
    await cartDB.update(req.params.idCart, cart);
    res.send(await cartDB.getById(req.params.idCart, cart));
  } else {
    res.send({ Info: `El elemento a eliminar no existe` });
  }
});
module.exports = router;
