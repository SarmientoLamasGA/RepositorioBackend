const ContainerMongo = require("../../containers/containerMongo");
const ordersSchema = require("../models/orders.model");
let instance = null;

class OrderDaoMongo extends ContainerMongo {
  constructor() {
    super("orders", ordersSchema);
  }

  static getInstance() {
    if (!instance) {
      instance = new OrderDaoMongo();
    }
    return instance;
  }

  async genOrderNumber() {
    try {
      const findNumber = await this.collection
        .findOne()
        .sort({ orderNumber: -1 })
        .limit(1);
      let number;

      if (!findNumber) {
        number = 1;
      } else {
        number = findNumber.orderNumber + 1;
      }

      return number;
    } catch (error) {
      console.log(error);
    }
  }

  async saveOrder(obj, email) {
    try {
      const orderNumber = await this.genOrderNumber();
      const newOrder = {
        orderNumber,
        UId: obj.UId,
        username: obj.username,
        contactMail: email,
        productos: obj.productos,
      };
      const newProd = await this.collection.create(newOrder);
      return newProd;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = OrderDaoMongo;
