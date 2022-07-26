const { Router } = require("express");
const router = new Router();

const checkUserSession = require("../middlewares/checkUserSession");

const CartDaosMongo = require("../daos/cart/cartDaosMongo.js");
const cartDB = new CartDaosMongo();

const ProductsDaosMongo = require("../daos/products/productsDaosMongo.js");
const productsDB = new ProductsDaosMongo();

router
  .route("/:idCart")
  .get(checkUserSession, async (req, res) => {
    try {
      const prodList = await productsDB.getAll();
      res.render("pages/shop", { data: prodList });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    const idCart = req.params.idCart;
    const cart = await cartDB.getById(idCart);
    const prodList = await productsDB.getAll();
    const selectedProd = await productsDB.getById(req.body.UId);

    res.render("pages/shop", {
      data: prodList,
      saveData: await cartDB.addToCart(cart, selectedProd, idCart),
    });
  });

module.exports = router;
