const ContainerFirebase = require("../../containers/containerFirebase");

class ProductsFirebaseDaos extends ContainerFirebase {
  constructor() {
    super("products");
  }
}

module.exports = ProductsFirebaseDaos;
