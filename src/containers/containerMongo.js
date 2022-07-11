const mongoose = require("mongoose");
const config = require("../../config/config");

mongoose.connect(config.MONGODB_CONTAINERMONGO);

// mongoose.connection.on("open", () => {
//   console.log("Base de datos Mongo");
// });
// mongoose.connection.on("error", () => {
//   console.log("error");
// });

const genId = async (db) => {
  try {
    const findId = await db.findOne().sort({ UId: -1 }).limit(1);
    let id;

    if (!findId) {
      id = 1;
    } else {
      id = findId.UId + 1;
    }

    return id;
  } catch (error) {
    console.log(error);
  }
};

class ContainerMongo {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const doc = this.collection.find();
      return doc;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      const prodExist = await this.collection.findOne({ _id: id });
      if (!!prodExist) {
        return prodExist;
      } else {
        return !!prodExist;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save({ title, price, thumbnail, description }) {
    try {
      const id = await genId(this.collection);
      const newProd = this.collection.create({
        UId: id,
        title,
        price,
        thumbnail,
        description,
        stock: 500,
      });
      return newProd;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      console.log(id);
      await this.collection.findOneAndUpdate({ _id: id }, data);
      return { Info: "Updated" };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
      return await this.collection.find();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      await this.collection.findOneAndDelete({ _id: id });
      return await this.collection.find();
    } catch (err) {
      console.log(err);
    }
  }

  async addToCart(cart, prod, idCart) {
    try {
      if (cart.id === idCart && prod.id === prod.id) {
        prod.sent = Date.now();
        await cart.productos.push(prod);
        await this.update(cart._id, cart);
        return await this.getById(idCart);
      } else {
        return { Info: "El elemento no existe" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFromCart(cart, idCart, idProd) {
    try {
      const prodIndex = cart.productos.findIndex(
        (p) => p._id.valueOf() === idProd
      );
      if (prodIndex !== -1) {
        cart.productos.splice(prodIndex, 1);
        await this.update(idCart, cart);
        return await this.getById(idCart);
      } else {
        return { Info: `El elemento a eliminar no existe` };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ContainerMongo;
