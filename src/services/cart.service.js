const getDao = () => {
  const CartFactory = require("../factory/cartFactory");
  const instance = new CartFactory();
  const create = instance.create();
  return create;
};

class CartService {
  constructor() {
    this.dao = getDao();
  }

  async getAll() {
    return this.dao.getAll();
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async addToCart(cart, selectedProd, idCart) {
    return this.dao.addToCart(cart, selectedProd, idCart);
  }
}

module.exports = CartService;
