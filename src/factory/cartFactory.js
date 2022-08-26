const CartDaosMongo = require("../daos/cart/cartDaoMongo");
const options = require("../utils/minimist.options");
const db = options.db;

class CartsFactory {
  create() {
    if (db == 1) {
      const db = CartDaosMongo.getInstance();
      return db;
    } else {
      const db = CartDaosMongo.getInstance();
      return db;
    }
  }
}

module.exports = CartsFactory;
