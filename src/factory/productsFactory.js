const ProductsDaosMongo = require("../daos/products/productsDaosMongo");
const ProductsDaosFile = require("../daos/products/ProducotsDaosFile");
const options = require("../utils/minimist.options");
const db = options.db;

class productsFactory {
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

module.exports = productsFactory;
