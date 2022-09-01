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
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async addToCart(cart, selectedProd, idCart) {
    return await this.dao.addToCart(cart, selectedProd, idCart);
  }

  async deleteFromCart(cart, userUId, UId) {
    return await this.dao.deleteFromCart(cart, userUId, UId);
  }

  async clearCart(id, cart) {
    return await this.dao.clearCart(id, cart);
  }
}

module.exports = CartService;
