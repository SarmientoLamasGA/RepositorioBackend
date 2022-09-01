const ContainerMongo = require("../../containers/containerMongo");
const cartSchema = require("../models/cart.model");
let instance = null;

class CartDaosMongo extends ContainerMongo {
  constructor() {
    super("cart", cartSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new CartDaosMongo();
    }
    return instance;
  }

  async clearCart(id, cart) {
    cart.productos = [];
    return await this.collection.findOneAndUpdate({ UId: id }, cart);
  }
}

module.exports = CartDaosMongo;
