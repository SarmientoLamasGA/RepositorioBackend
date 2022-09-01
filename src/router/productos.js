const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const auth = require("../middlewares/auth");
const checkUserSession = require("../middlewares/checkUserSession");

const router = new Router();

const ProductController = require("../controllers/product.controller");
const productController = new ProductController();

//Listado de productos
router
  .route("/")
  .get(checkUserSession, logInfo, productController.getAll) //Se obtienen todos los productos
  .post(checkUserSession, productController.addToCart) //Se agrega un producto al carrito
  .delete(checkUserSession, auth, productController.deleteAllCarts); //se borran todos los carritos, solo para admin

router
  .route("/cargar-productos")
  .get(logInfo, checkUserSession, auth, productController.loadSection) //Se obtienen todos los productos para la sección de carga de productos, solo para admin
  .post(auth, productController.loadProduct); //Se cargan productos, solo para admin

router
  .route("/:id?")
  .get(logInfo, checkUserSession, productController.getById) //Se muestra un producto
  //POST Y PUT HACEN LO MISMO, MODIFICAN OBJETO
  .post(checkUserSession, auth, productController.updateProd) //Se modifica un producto, solo para admin
  .put(checkUserSession, auth, productController.updateProd) //Idem
  .delete(checkUserSession, auth, productController.deleteProd); //Borra producto elegido, solo para admin

router
  .route("/categoria/:category?")
  .get(logInfo, checkUserSession, productController.searchCategory); //Si se proporciona una categoría se muestran todos los productos que la comparten, si no coincide se muestran todos los productos

module.exports = router;
