const ContainerMongo = require("../../containers/containerMongo");
const cartSchema = require("../models/cart.model");

class CartDaosMongo extends ContainerMongo {
  constructor() {
    super("cart", cartSchema);
  }
}

module.exports = CartDaosMongo;
