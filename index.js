const express = require("express");
const moment = require("moment");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Conectado en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log("error"));

app.get("/", (req, res) => {
  res.send(`<h1>Hola</h1>`);
});

let visita = 0;
app.get("/visitas", (req, res) => {
  res.send({ Visita: `${visita++}` });
});

app.get("/fhy", (req, res) => {
  res.send({ fhy: moment().format(`YY/MM/DD HH:mm:ss`) });
});
