const { Router } = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const express = require("express");

const httpServer = new HttpServer(express);
const io = new IOServer(httpServer);

const router = new Router();

const ControlMessage = require("../../dbSql/controldb/controlMessages");
const messagesDB = new ControlMessage();

// const ControlProductsDB = require("../../controldb/controlProducts");
// const productsDB = new ControlProductsDB();

//Mongo DB

const ProductsDaosMongo = require("../daos/products/productsDaosMongo");
const productsDB = new ProductsDaosMongo();

//Firebase DB
// const ProductsFirebaseDaos = require("../daos/products/productDaosFirebase");
// const productsDB = new ProductsFirebaseDaos();

const admin = true;

//Websocket
io.on("connection", async (socket) => {
  //Conexion
  console.log("Usuario conectado");
  io.sockets.emit("requestChat", await messagesDB.getChat()); // Ver comentario abajo
  io.sockets.emit("requestProducts", await productsDB.getAll()); // Ambas líneas funcionan todo el tiempo desde la conexión

  //Productos
  socket.on("newProd", async (prod) => {
    await productsDB.save(prod);
    io.sockets.emit("prodList", { data: await productsDB.getAll() }); //No sé si es útil ya que en connection hay una línea que actualiza constantemente (39)
  });

  //Chat
  socket.on("newMessage", async (message) => {
    await messagesDB.saveChat(message);
    io.sockets.emit("messages", { data: await messagesDB.getChat() }); //Idém línea 48
    // });
  });
});

//Listado de productos
router
  .route("/")
  .get(async (req, res) => {
    res.render("index", { data: await productsDB.getAll() });
  })
  .post(async (req, res) => {
    if (admin) {
      res.send(await productsDB.save(req.body));
    } else {
      return { error: "-1", descripcion: `POST a "/" no autorizado` };
    }
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
  .route("/:id?")
  .get(async (req, res) => {
    req.params.id
      ? res.send(await productsDB.getById(req.params.id)) //Se obtiene el ID especificado en caso de que exista
      : res.send(await productsDB.getAll()); //Se obtiene todo el contenido
  })
  .put(async (req, res) => {
    if (admin) {
      const idExist = await productsDB.getById(req.params.id);
      if (idExist) {
        res.send(await productsDB.update(req.params.id, req.body)); // Se modifica el objeto correspondiente al ID en caso de que exista;
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
        res.send(await productsDB.deleteById(req.params.id)); //Se borra el objeto según el ID
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
