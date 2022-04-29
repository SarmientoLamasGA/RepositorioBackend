const ContainerMongo = require("../../containers/containerMongo");

class ProductsDaosMongo extends ContainerMongo {
  constructor() {
    super(products, {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
      description: { type: String, required: true },
      stock: { type: Number, required: true },
      timestamps: { createdAt: "Creado el ", updatedAt: "Modificado el " },
    });
  }
}

exports.module = ProductsDaosMongo;
