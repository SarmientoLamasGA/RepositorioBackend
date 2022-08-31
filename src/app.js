const express = require("express");
const { Router } = require("express");
const session = require("express-session");
const compression = require("compression");
const passport = require("passport");
const router = Router();
const app = express();
const MongoStore = require("connect-mongo");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const config = require("./config/config");

// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);

app.use(express.static(__dirname + `/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGODB_SESSION,
      ttl: 60,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
//Root
io.on("connection", async () => {
  console.log("Socket iniciado");
});

const root = require("./router/root");
app.use("/", root);

const productosRouter = require("./router/productos");
app.use("/api/productos", productosRouter);

const cartRouter = require("./router/cart");
app.use("/api/micarrito", cartRouter);

const cartAndProductsRouter = require("./router/cartAndProductsRouter");
app.use("/api/carrito/productos", cartAndProductsRouter);

const cookies = require("./router/cookies");
app.use("/api/cookies", cookies);

const logIn = require("./router/User");
app.use("/api/usuario", logIn);

const info = require("./router/info");
app.use("/api/info", info);

const random = require("./router/random");
app.use("/api/random", random);

const shop = require("./router/shop");
app.use("/api/tienda", shop);

const chat = require("./router/chat");
app.use("/api/chat", chat);

const contactMail = require("./router/contactMail");
app.use("/api/contacto", contactMail);

const contactSms = require("./router/contactSms");
app.use("/api/contactosms", contactSms);

const contactWsp = require("./router/contactWsp");
app.use("/api/contactowsp", contactWsp);

//Rutas inexistentes, este siempre tiene que ir último
const rutaError = require("./router/routeWarn");
app.use("*", rutaError);

//Template
app.set("view engine", "ejs");
app.set("views", "./views");

module.exports = app;
