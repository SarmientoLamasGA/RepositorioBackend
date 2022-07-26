const ContainerFile = require("../../containers/containerArchivo");
let instance = null;

class ProductsDaosFile extends ContainerFile {
  static getInstance() {
    if (!instance) {
      instance = new ProductsDaosFile();
    }
    return instance;
  }
}

module.exports = ProductsDaosFile;
