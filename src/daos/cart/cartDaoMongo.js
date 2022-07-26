const ContainerMongo = require("../../containers/containerMongo");
const cartSchema = require("../models/cart.model");
let instance = null;

class CartDaosMongo extends ContainerMongo {
  constructor() {
    super("cart", cartSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductsDaosMongo();
    }
    return instance;
  }
}

module.exports = CartDaosMongo;
