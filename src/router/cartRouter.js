const { Router } = require("express");

//DB archivos
// const CartContainer = require("../../cartContainer");
// const cartContainer = new CartContainer();

//DB MongoDB
const CartDaosMongo = require("../daos/cart/cartDaosMongo");
const cartContainer = CartDaosMongo();

//DB Firebase
// const CartDaosFirebase = require("../daos/cart/cartDaosFirebase");
// cartContainer = CartDaosFirebase();

const router = new Router();

const admin = true;

// Carro de compras
router.route("/").post(async (req, res) => {
  res.send(await cartContainer.createCart());
});

router.route("/:id").delete(async (req, res) => {
  req.params.id
    ? res.send(await cartContainer.deleteCart(req.params.id))
    : res.send({ info: "No existe este carrito" });
});

router
  .route("/:id/productos")
  .get(async (req, res) => {
    res.send(await cartContainer.getCart(req.params.id));
  })
  .post(async (req, res) => {
    //El agregado de productos se realiza por medio de ID!!
    const id = req.body.id;
    const product = await contenedor.getByID(id);
    res.send(await cartContainer.addProduct(req.params.id, product));
  });

router.route("/:id/productos/:id_prod").delete(async (req, res) => {
  const idCart = req.params.id;
  const product = await contenedor.getByID(req.params.id_prod);
  const prodId = product.id;
  prodId
    ? res.send(await cartContainer.deleteProduct(idCart, prodId))
    : res.send({ Error: "No existe este producto" });
});

module.exports = router;
