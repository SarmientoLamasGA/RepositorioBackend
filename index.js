const express = require("express");
const moment = require("moment");
const fs = require("fs");
const app = express();
const PORT = 8080;

//class
class Container {
  constructor() {
    this.url = `./productos.txt`;
  }
  async getAll() {
    const file = await fs.promises.readFile("./productos.txt", "utf-8"); //se lee el archivo y se retorna su valor
    return JSON.parse(file);
  }
  async getRandom() {
    const file = await fs.promises.readFile("./productos.txt", "utf-8"); //se lee el archivo
    const prods = JSON.parse(file);
    const randomProd = prods[Math.floor(Math.random() * prods.length)]; //se elige un elemento aleatorio del array
    console.log(randomProd);
    return randomProd;
  }
}

//server
const server = app.listen(PORT, () => {
  console.log(`Conectado en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log("error"));

//get
app.get("/", (req, res) => {
  res.send(`<h1>Hola 1</h1>`);
});

app.get("/productos", (req, res) => {
  lista.getAll().then((li) => res.send(li)); //se ejecuta la función, luego su valor se envía.
});

app.get("/productoRandom", (req, res) => {
  lista.getRandom().then((li) => res.send(li));
});

// crear nuevo container
let lista = new Container();
