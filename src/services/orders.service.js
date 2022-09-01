const getDao = () => {
  const OrderFactory = require("../factory/ordersFactory");
  const instance = new OrderFactory();
  const create = instance.create();

  return create;
};

class OrderService {
  constructor() {
    this.dao = getDao();
  }

  async saveOrder(cart, user, email) {
    return await this.dao.saveOrder(cart, user, email);
  }
}

module.exports = OrderService;
