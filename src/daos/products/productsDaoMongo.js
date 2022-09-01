const ContainerMongo = require("../../containers/containerMongo");
const prodSchema = require("../models/product.model");
let instance = null;

class ProductsDaosMongo extends ContainerMongo {
  constructor() {
    super("products", prodSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductsDaosMongo();
    }
    return instance;
  }

  async getByCategory(category) {
    try {
      console.log(typeof category);
      const prodExist = await this.collection.find({ category: category });
      if (prodExist) {
        return prodExist;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ProductsDaosMongo;
