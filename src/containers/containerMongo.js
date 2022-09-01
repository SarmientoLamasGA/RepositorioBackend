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
      const prodExist = await this.collection.findOne({ UId: id });
      if (!!prodExist) {
        return prodExist;
      } else {
        return !!prodExist;
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
}

module.exports = ContainerMongo;
