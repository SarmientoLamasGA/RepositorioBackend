const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://GabrielSarmientoLamas:coder@coderhousebackend.pd26u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

mongoose.connection.on("open", () => {
  console.log("Base de datos Mongo");
});
mongoose.connection.on("error", () => {
  console.log("error");
});

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
      const doc = this.collection.findOne(id);
      return doc;
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

  async deleteAll() {
    try {
      this.collection.deleteMany({});
      return { Info: "Se ha vaciado la sección" };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      this.collection.findOneAndDelete({ id: id });
      return { Info: `Se ha eliminado el objetdo con id ${id}` };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ContainerMongo;
