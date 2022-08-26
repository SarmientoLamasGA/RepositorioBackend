const { Router } = require("express");
const router = new Router();

const checkUserSession = require("../middlewares/checkUserSession");

const CartDaosMongo = require("../daos/cart/cartDaoMongo");
const cartDB = new CartDaosMongo();

const ProductsDaosMongo = require("../daos/products/productsDaoMongo");
const productsDB = new ProductsDaosMongo();

router
  .route("/")
  .get(checkUserSession, async (req, res) => {
    try {
      const user = req.user;
      const prodList = await productsDB.getAll();
      res.render("pages/shop", { data: prodList, user });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    const user = req.user;
    const idCart = user.UId;
    const cart = await cartDB.getById(idCart);
    const prodList = await productsDB.getAll();
    const selectedProd = await productsDB.getById(req.body.UId);

    res.render("pages/shop", {
      data: prodList,
      saveData: await cartDB.addToCart(cart, selectedProd, idCart),
      user,
    });
  });

module.exports = router;
