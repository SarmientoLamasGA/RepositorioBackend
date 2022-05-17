const express = require("express");
const { Router } = require("express");
const router = Router();
const app = express();

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);

app.use(express.static(__dirname + `/public`));
// app.use("/styles", express.static(__dirname + "/styles"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Root
io.on("connection", async () => {
  console.log("Socket iniciado");
});

router.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router.get("*", (req, res) => {
  res.status(404);
  res.send({ Error: -2, descripcion: `Ruta no implementada` });
});

const productosRouter = require("./router/productosRouter");
app.use("/api/productos", productosRouter);

const cartRouter = require("./router/cartRouter");
app.use("/api/carrito", cartRouter);

const cartAndProductsRouter = require("./router/cartAndProductsRouter");
app.use("/api/carrito/productos", cartAndProductsRouter);

const productsTest = require("./router/productsTest");
app.use("/api/productos-test", productsTest, (req, res, next) => {
  req.io = io;
  next();
});

//Template
app.set("view engine", "ejs");
app.set("views", "./views");

module.exports = app;
