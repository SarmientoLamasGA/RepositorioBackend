const { Router } = require("express");
const express = require("express");
const logInfo = require("../utils/logger.info");
const logError = require("../utils/logger.error");
const checkUserSession = require("../middlewares/checkUserSession");

// const httpServer = new HttpServer(express);
// const io = new IOServer(httpServer);

const router = new Router();

//Mongo DB

// const productsFactory = require("../factory/productsFactory");
// const factory = new productsFactory();
// const productsDB = factory.create();

const CartDaosMongo = require("../daos/cart/cartDaoMongo");
const cartDB = new CartDaosMongo();

const ProductsDaosMongo = require("../daos/products/productsDaoMongo");
const productsDB = new ProductsDaosMongo();

const admin = true;

// //Websocket
// io.on("connection", async (socket) => {
//   //Conexion
//   console.log("Usuario conectado");
//   io.sockets.emit("requestChat", await messagesDB.getChat()); // Ver comentario abajo
//   io.sockets.emit("requestProducts", await productsDB.getAll()); // Ambas líneas funcionan todo el tiempo desde la conexión

//   //Productos
//   socket.on("newProd", async (prod) => {
//     await productsDB.save(prod);
//     io.sockets.emit("prodList", { data: await productsDB.getAll() }); //No sé si es útil ya que en connection hay una línea que actualiza constantemente (39)
//   });

//   //Chat
//   socket.on("newMessage", async (message) => {
//     await messagesDB.saveChat(message);
//     io.sockets.emit("messages", { data: await messagesDB.getChat() }); //Idém línea 48
//     // });
//   });
// });

//Listado de productos
router
  .route("/")
  // .get(logInfo, checkUserSession, async (req, res) => {
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
  // .get(checkUserSession, async (req, res) => {
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
      const prod = await productsDB.getById(req.params.id);
      if (prod) {
        res.send(prod);
      } else {
        logError(req.params.id);
        res.send({ Error: "Producto inexistente" });
      }
    } else {
      console.log(await productsDB.getAll()); //Se obtiene todo el contenido
    }
  })
  .put(async (req, res) => {
    if (admin) {
      const idExist = await productsDB.getById(req.params.id);
      if (idExist) {
        res.send(await productsDB.modify(req.params.id, req.body)); // Se modifica el objeto correspondiente al ID en caso de que exista;
      } else {
        res.send({ Info: "No existe el producto" });
      }
    } else {
      return { error: "-1", descripcion: `PUT a "/productos" no autorizado` };
    }
  })
  .delete(async (req, res) => {
    if (admin) {
      const idExist = await productsDB.getById(req.params.id);
      if (idExist) {
        res.send(await productsDB.deleteDoc(req.params.id)); //Se borra el objeto según el ID
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

module.exports = router;
