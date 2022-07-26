const ContainerMongo = require("../../containers/containerMongo");
const UserSchema = require("../models/user.model");
let instance = null;
class UserDaoMongo extends ContainerMongo {
  constructor() {
    super("Users", UserSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductsDaosMongo();
    }
    return instance;
  }
}

module.exports = UserDaoMongo;
