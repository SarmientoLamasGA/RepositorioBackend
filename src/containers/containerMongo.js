const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://GabrielSarmientoLamas:coder@coderhousebackend.pd26u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

// mongoose.connection.on("open", () => {
//   console.log("Base de datos Mongo");
// });
// mongoose.connection.on("error", () => {
//   console.log("error");
// });

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
      return await this.collection.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      const newProd = this.collection.create(obj);
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
}

module.exports = ContainerMongo;
