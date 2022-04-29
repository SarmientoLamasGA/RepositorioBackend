const ContainerFirebase = require("../../containers/containerFirebase");

class FirebaseDaosProducts extends ContainerFirebase {
  constructor() {
    super("products");
  }
}

exports.module = FirebaseDaosProducts;
