const CartDaosMongo = require("../daos/cart/cartDaoMongo");
class CartsFactory {
  create() {
    const db = CartDaosMongo.getInstance();
    return db;
  }
}

module.exports = CartsFactory;
