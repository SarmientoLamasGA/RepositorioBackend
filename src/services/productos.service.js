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
    return this.dao.update(id, data);
  }

  async clearCollection() {
    return this.dao.deleteAll();
  }

  async deleteDoc(id) {
    return this.dao.deleteById(id);
  }

  async getByCategory(category) {
    return this.dao.getByCategory(category);
  }

  async addToCart(cart, selectedProd) {
    return this.dao.addToCart(cart, selectedProd);
  }

  async deleteFromCart(cart, idCart, idProd) {
    return this.dao.deleteFromCart(cart, idCart, idProd);
  }
}

module.exports = ProductService;
