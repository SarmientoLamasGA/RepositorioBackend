const ProductsDaosMongo = require("../daos/products/productsDaoMongo");
const ProductsDaosFile = require("../daos/products/productsDaoFile");
const options = require("../utils/minimist.options");
const db = options.db;

class ProductsFactory {
  create() {
    if (db == 1) {
      const db = ProductsDaosMongo.getInstance();
      return db;
    } else if (db == 2) {
      const db = ProductsDaosFile.getInstance();
      return db;
    } else {
      const db = ProductsDaosMongo.getInstance();
      return db;
    }
  }
}

module.exports = ProductsFactory;
