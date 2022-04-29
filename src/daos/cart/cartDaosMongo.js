const ContainerMongo = require("../../containers/containerMongo");

class CartDaosMongo extends ContainerMongo {
  constructor() {
    super(cart, {
      productos: { type: [], required: true },
      timestamps: { createdAt: "Creado el ", updatedAt: "Modificado el " },
    });
  }
}

exports.module = CartDaosMongo;
