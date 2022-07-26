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
}

module.exports = ProductsDaosMongo;
