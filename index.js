const express = require("express");
const { Router } = require("express");
const Container = require("./container");

const app = express();
const router = Router();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
app.use(`/static`, express.static(__dirname + `/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contenedor = new Container();

router.route("/").get((req, res) => {
  res.send(`<h1>Inicio</h1>`);
});

router
  .route("/productos")
  .get(async (req, res) => {
    res.send(await contenedor.getAll());
  })
  .post(async (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;

    res.send(await contenedor.save({ title, price, thumbnail }));
  });

router
  .route("/productos/:id")
  .get(async (req, res) => {
    res.send(await contenedor.getByID(req.params.id));
  })
  .put(async (req, res) => {
    const id = Number(req.params.id);
    const title = String(req.body.title);
    const price = Number(req.body.price);
    const thumbnail = String(req.body.thumbnail);
    res.send(await contenedor.update(id, title, price, thumbnail, id));
  })
  .delete(async (req, res) => {
    res.send(await contenedor.deleteById(req.params.id));
  });

app.use("/api", router);
