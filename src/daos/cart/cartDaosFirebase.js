const ContainerFirebase = require("../../containers/containerFirebase");

class FirebaseDaosCart extends ContainerFirebase {
  constructor() {
    super("carts");
  }
}

module.exports = FirebaseDaosCart;
