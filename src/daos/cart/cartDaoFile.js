const ContainerFile = require("../../containers/containerFileCart");
let instance = null;

class CartDaosFile extends ContainerFile {
  static getInstance() {
    if (!instance) {
      instance = new ProductsDaosFile();
    }
    return instance;
  }
}

module.exports = CartDaosFile;
