const ContainerMongo = require("../../containers/containerMongo");
const ordersSchema = require("../models/orders.model");
let instance = null;

const CartService = require("../../services/cart.service");
const cartDB = new CartService();

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

  async saveOrder(cart, user, email) {
    try {
      const orderNumber = await this.genOrderNumber();
      const newOrder = {
        orderNumber,
        UId: cart.UId,
        username: user.username,
        contactMail: email,
        productos: cart.productos,
      };

      const newProd = await this.collection.create(newOrder);
      return newProd;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = OrderDaoMongo;
