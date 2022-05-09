const { Router } = require("express");

//DB MongoDB
const CartDaosMongo = require("../daos/cart/cartDaosMongo.js");
const cartDB = new CartDaosMongo();

const ProductsDaosMongo = require("../daos/products/productsDaosMongo.js");
const productsDB = new ProductsDaosMongo();

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// const cartDB = new CartDaosFirebase();

// const ProductsDaosFirebase = require("../daos/products/productDaosFirebase");
// const productsDB = new ProductsDaosFirebase();

const router = new Router();

router.route("/:idCart/:idProd").post(async (req, res) => {
  try {
    const cart = await cartDB.getById(req.params.idCart);
    const idCart = req.params.idCart;
    const prod = await productsDB.getById(req.params.idProd);

    res.send(await cartDB.addToCart(cart, prod, idCart));
  } catch (err) {
    console.log(err);
  }
});

router.route("/:idCart/:idProd").delete(async (req, res) => {
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

  res.send(await cartDB.deleteFromCart(cart, idCart, idProd));
});

module.exports = router;
