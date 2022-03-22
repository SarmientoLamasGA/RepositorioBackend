const express = require("express");
const { Router } = require("express");
const Container = require("./container");
const handlebars = require("express-handlebars");

const app = express();
const router = Router();
const PORT = 8080;

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
app.use(express.static(__dirname + `/public`));
app.use("/styles", express.static(__dirname + `/styles`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contenedor = new Container();

router.route("/").get((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router
  .route("/productos")
  .get(async (req, res) => {
    res.render("main", { data: await contenedor.getAll() }); //Se obtiene todo el contenido
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
