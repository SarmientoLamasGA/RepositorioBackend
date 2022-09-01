const { Request, Response } = require("express");
const req = Request;
const res = Response;
const ProductService = require("../services/productos.service");
const productsDB = new ProductService();

class ProductsController {
  async getAll(obj) {
    try {
      const user = obj;
      const prodList = await productsDB.getAll();
      //   res.render("pages/shop", { data: prodList, user });
      res.send({ data: prodList, user });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductsController;
