const express = require("express");
const { Router } = require("express");
const session = require("express-session");
const router = Router();
const app = express();

const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

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
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://GabrielSarmientoLamas:coder@coderhousebackend.pd26u.mongodb.net/sessions?retryWrites=true&w=majority",
      ttl: 60,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

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

const cookies = require("./router/cookies");
app.use("/api/cookies", cookies);

const logIn = require("./router/User");
app.use("/api/User", logIn);

//Template
app.set("view engine", "ejs");
app.set("views", "./views");

module.exports = app;
