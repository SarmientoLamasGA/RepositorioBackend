const ContainerFirebase = require("../../containers/containerFirebase");

class FirebaseDaosCart extends ContainerFirebase {
  constructor() {
    super("cart");
  }
}

exports.module = FirebaseDaosCart;
