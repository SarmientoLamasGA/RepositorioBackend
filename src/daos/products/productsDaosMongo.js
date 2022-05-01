const ContainerMongo = require("../../containers/containerMongo");
const prodSchema = require("../models/product.model");

class ProductsDaosMongo extends ContainerMongo {
  constructor() {
    super("products", prodSchema);
  }
}

module.exports = ProductsDaosMongo;
