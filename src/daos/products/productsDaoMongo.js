const ContainerMongo = require("../../containers/containerMongo");
const prodSchema = require("../models/product.model");
let instance = null;

class ProductsDaosMongo extends ContainerMongo {
  constructor() {
    super("products", prodSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductsDaosMongo();
    }
    return instance;
  }

  async getByCategory(category) {
    try {
      const prodExist = await this.collection.find({ category: category });
      if (prodExist) {
        return prodExist;
      }
    } catch (err) {
      res.render("Ha ocurrido un error");
    }
  }
}

module.exports = ProductsDaosMongo;
