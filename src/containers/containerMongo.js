const mongoose = require("mongoose");
const config = require("../config/config");
let instance = null;

mongoose.connect(config.MONGODB_CONTAINERMONGO);

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

  static getInstance() {
    if (!instance) {
      instance = new ContainerMongo();
    }
    return instance;
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
      console.log(id);
      const objExist = await this.collection.findOne({ UId: id });
      if (!!objExist) {
        return objExist;
      } else {
        return !!objExist;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      const id = await genId(this.collection);
      if (obj) {
        const newProd = await this.collection.create({ UId: id, ...obj });
        return newProd;
      } else {
        const newProd = await this.collection.create({
          UId: id,
        });
        return newProd;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      await this.collection.findOneAndUpdate({ UId: id }, data);
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
      await this.collection.findOneAndDelete({ UId: id });
      return await this.collection.find();
    } catch (err) {
      console.log(err);
    }
  }
  async addToCart(cart, selectedProd) {
    try {
      const prodDTO = {
        UId: selectedProd.UId,
        title: selectedProd.title,
        price: selectedProd.price,
        thumbnail: selectedProd.thumbnail,
        description: selectedProd.description,
      };
      selectedProd.sent = Number(Date.now());
      await cart.productos.push(prodDTO);
      this.update(cart.UId, cart);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFromCart(cart, idCart, idProd) {
    try {
      const prodIndex = cart.productos.findIndex((p) => p.UId == idProd);
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
