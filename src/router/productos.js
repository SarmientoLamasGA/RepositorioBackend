const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const logError = require("../utils/logger.error");
const checkUserSession = require("../middlewares/checkUserSession");

const router = new Router();

const ProductsService = require("../services/productos.service");
const productsDB = new ProductsService();
const CartService = require("../services/cart.service");
const cartDB = new CartService();

//Listado de productos
router
  .route("/")
  .get(checkUserSession, logInfo, async (req, res) => {
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
  })
  .delete(async (req, res) => {
    if (admin) {
      res.send(await productsDB.deleteAll());
    } else {
      return {
        error: "-1",
        descripcion: `DELETE a "/productos" no autorizado`,
      };
    }
  });

router
  .route("/cargar-productos")
  .get(checkUserSession, async (req, res) => {
    const user = req.user;
    res.render("pages/loadProducts", {
      data: await productsDB.getAll(),
      user: user,
    });
  })
  .post(async (req, res) => {
    try {
      const user = req.user;
      console.log(req.body);
      res.render("pages/loadProducts", {
        data: await productsDB.getAll(),
        saveData: await productsDB.save(req.body),
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/:id?")
  .get(logInfo, checkUserSession, async (req, res) => {
    if (req.params.id) {
      const user = req.user;
      const prod = await productsDB.getById(req.params.id);
      if (prod) {
        res.render("pages/prodInfo", { user, prod });
      } else {
        logError(req.params.id);
        res.send({ Error: "Producto inexistente" });
      }
    } else {
      console.log(await productsDB.getAll());
    }
  })
  //POST Y PUT HACEN LO MISMO, MODIFICAN OBJETO
  .post(async (req, res) => {
    const idExist = await productsDB.getById(req.params.id);
    if (idExist) {
      res.send(await productsDB.modify(req.params.id, req.body));
    } else {
      res.send({ Info: "No existe el producto" });
    }
  })
  .put(async (req, res) => {
    const idExist = await productsDB.getById(req.params.id);
    if (idExist) {
      res.send(await productsDB.modify(req.params.id, req.body));
    } else {
      res.send({ Info: "No existe el producto" });
    }
  })
  .delete(async (req, res) => {
    if (admin) {
      const idExist = await productsDB.getById(req.params.id);
      if (idExist) {
        await productsDB.deleteDoc(req.params.id);
        res.redirect("/");
      } else {
        res.send({ Info: "No existe el producto" });
      }
    } else {
      return {
        error: "-1",
        descripcion: `DELETE a "/productos" no autorizado`,
      };
    }
  });

router
  .route("/categoria/:category?")
  .get(logInfo, checkUserSession, async (req, res) => {
    const user = req.user;
    if (req.params.category) {
      const prod = await productsDB.getByCategory(req.params.category);
      if (prod) {
        res.render("pages/category", { user, prod });
      } else {
        logError(req.params.category);
        res.send({ Error: "Producto inexistente" });
      }
    } else {
      console.log(await productsDB.getAll()); //Se obtiene todo el contenido
    }
  });

module.exports = router;
