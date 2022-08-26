const ProductsDaosMongo = require("../daos/products/productsDaoMongo");
const options = require("../utils/minimist.options");
const db = options.db;

class ProductsFactory {
  create() {
    if (db == 1) {
      const db = ProductsDaosMongo.getInstance();
      return db;
    } else {
      const db = ProductsDaosMongo.getInstance();
      return db;
    }
  }
}

module.exports = ProductsFactory;
