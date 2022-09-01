const getDao = () => {
  const ProductsFactory = require("../factory/productsFactory");
  const instance = new ProductsFactory();
  const create = instance.create();

  return create;
};

class ProductService {
  constructor() {
    this.dao = getDao();
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async add(obj) {
    return await this.dao.save(obj);
  }

  async modify(id, data) {
    return await this.dao.update(id, data);
  }

  async clearCollection() {
    return await this.dao.deleteAll();
  }

  async deleteDoc(id) {
    return await this.dao.deleteById(id);
  }

  async getByCategory(category) {
    return await this.dao.getByCategory(category);
  }

  async addToCart(cart, selectedProd) {
    return await this.dao.addToCart(cart, selectedProd);
  }

  async deleteFromCart(cart, idCart, idProd) {
    return await this.dao.deleteFromCart(cart, idCart, idProd);
  }
}

module.exports = ProductService;
