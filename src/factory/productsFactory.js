const ProductsDaosMongo = require("../daos/products/productsDaoMongo");
const options = require("../utils/minimist.options");
const db = options.db;

class ProductsFactory {
  create() {
    const db = ProductsDaosMongo.getInstance();
    return db;
  }
}

module.exports = ProductsFactory;
