const getDao = () => {
  const ProductsFactory = require("../factory/productsFactory");
  const instance = new ProductsFactory();
  const create = instance.create();

  return create;
};

let instance = null;

class ProductRepo {
  constructor() {
    this.dao = getDao();
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductRepo();
    }
    return instance;
  }

  async getAll() {
    const dto = await this.dao.getAll();
    return dto;
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto;
  }

  async add(obj) {
    const dto = await this.dao.save(obj);
    return dto;
  }

  async modify(id, data) {
    const dto = this.dao.update(id, data);
    return dto;
  }

  async clearCollection() {
    const dto = this.dao.deleteAll();
    return dto;
  }

  async deleteDoc(id) {
    const dto = this.dao.deleteById(id);
    return dto;
  }
}

module.exports = ProductRepo;
