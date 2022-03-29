const express = require("express");
const { Router } = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Container = require("./container");
// const MessageDataBase = require("./messageDataBase")

const app = express();
const router = Router();
const PORT = 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messageDataBase = [
  { userEmail: "prueba@asd.dsa", time: "hora", message: "mensaje" },
];

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

const contenedor = new Container();

//Websocket

// const messageDataBase = new MessageDataBase;

io.on("connection", async (socket) => {
  //Conexion
  console.log("Usuario conectado");
  io.sockets.emit("requestChat", messageDataBase);
  io.sockets.emit("requestProducts", await contenedor.getAll());

  //Server
  socket.on("newMessage", (message) => {
    messageDataBase.push(message);
    io.sockets.emit("messages", messageDataBase);
  });

  socket.on("newProd", async (prod) => {
    await contenedor.save(prod);
    console.log(prod);
    io.sockets.emit("prodList", { data: await contenedor.getAll() });
  });
});

//Metodos
router.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router
  .route("/productos")
  .get(async (req, res) => {
    res.render("index", { data: await contenedor.getAll() }); //Se obtiene todo el contenido
  })
  .post(async (req, res) => {
    const title = String(req.body.title);
    const price = Number(req.body.price);
    const thumbnail = String(req.body.thumbnail);
    await contenedor.save({ title, price, thumbnail });
    res.redirect("/");
  });

router
  .route("/productos/:id")
  .get(async (req, res) => {
    res.send(await contenedor.getByID(req.params.id)); //Se obtiene el ID especificado en caso de que exista
  })
  .put(async (req, res) => {
    const id = Number(req.params.id);
    const title = String(req.body.title);
    const price = Number(req.body.price);
    const thumbnail = String(req.body.thumbnail);
    res.send(await contenedor.update(id, title, price, thumbnail, id)); // Se modifica el objeto correspondiente al ID en caso de que exista
  })
  .delete(async (req, res) => {
    res.send(await contenedor.deleteById(req.params.id)); //Se borra el objeto según el ID
  });

app.use("/api", router);
