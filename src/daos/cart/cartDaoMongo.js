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
}

module.exports = CartDaosMongo;
