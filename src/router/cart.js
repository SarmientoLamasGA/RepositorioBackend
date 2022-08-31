const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const checkUserSession = require("../middlewares/checkUserSession");

//DB
const CartsFactory = require("../factory/cartFactory");
const factory = new CartsFactory();
const cartDB = factory.create();

const router = new Router();

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
