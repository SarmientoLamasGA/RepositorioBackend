const express = require("express");
const { Router } = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const CartContainer = require("./cartContainer");
const ControlProductsDB = require("./controldb/controlProducts");
const ControlMessage = require("./controldb/controlMessages");

const app = express();
const router = Router();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const admin = true;

//Template
app.set("view engine", "ejs");
app.set("views", "./views");

httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
app.use(express.static(__dirname + `/public`));
app.use("/styles", express.static(__dirname + "/styles"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cartContainer = new CartContainer();
const productsDB = new ControlProductsDB();
const messagesDB = new ControlMessage();

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

//Metodos

//Root
router.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Listado de productos
router
  .route("/productos")
  .get(async (req, res) => {
    res.render("index", { data: await productsDB.getAll() });
  })
  .post(async (req, res) => {
    if (admin) {
      await productsDB.save(req.body);
      res.redirect("/");
    } else {
      return { error: "-1", descripcion: `POST a "/" no autorizado` };
    }
  });

router
  .route("/productos/:id?")
  .get(async (req, res) => {
    req.params.id
      ? res.send(await productsDB.getById(req.params.id)) //Se obtiene el ID especificado en caso de que exista
      : res.send(await productsDB.getAll()); //Se obtiene todo el contenido
  })
  .put(async (req, res) => {
    if (admin) {
      res.send(await productsDB.update(req.params.id, req.body)); // Se modifica el objeto correspondiente al ID en caso de que exista;
    } else {
      return { error: "-1", descripcion: `PUT a "/productos" no autorizado` };
    }
  })
  .delete(async (req, res) => {
    if (admin) {
      res.send(await productsDB.deleteById(req.params.id)); //Se borra el objeto según el ID
    } else {
      return {
        error: "-1",
        descripcion: `DELETE a "/productos" no autorizado`,
      };
    }
  });

//Carro de compras
router.route("/carrito").post(async (req, res) => {
  res.send(await cartContainer.createCart());
});

router.route("/carrito/:id").delete(async (req, res) => {
  req.params.id
    ? res.send(await cartContainer.deleteCart(req.params.id))
    : res.send({ info: "No existe este carrito" });
});

router
  .route("/carrito/:id/productos")
  .get(async (req, res) => {
    res.send(await cartContainer.getCart(req.params.id));
  })
  .post(async (req, res) => {
    //El agregado de productos se realiza por medio de ID!!
    const id = req.body.id;
    const product = await contenedor.getByID(id);
    res.send(await cartContainer.addProduct(req.params.id, product));
  });

router.route("/carrito/:id/productos/:id_prod").delete(async (req, res) => {
  const idCart = req.params.id;
  const product = await contenedor.getByID(req.params.id_prod);
  const prodId = product.id;
  prodId
    ? res.send(await cartContainer.deleteProduct(idCart, prodId))
    : res.send({ Error: "No existe este producto" });
});

router.get("*", (req, res) => {
  res.status(404);
  res.send({ Error: -2, descripcion: `Ruta no implementada` });
});

app.use("/api", router);
