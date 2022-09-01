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

  async saveOrder(cart, email) {
    return await this.dao.saveOrder(cart, email);
  }
}

module.exports = OrderService;
