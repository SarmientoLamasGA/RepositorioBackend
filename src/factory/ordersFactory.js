const OrderDaoMongo = require("../daos/orders/orderDaoMongo");

class OrderFactory {
  create() {
    const db = OrderDaoMongo.getInstance();
    return db;
  }
}

module.exports = OrderFactory;
