const ContainerMongo = require("../../containers/containerMongo");
const UserSchema = require("../models/user.model");

class UserDaoMongo extends ContainerMongo {
  constructor() {
    super("Users", UserSchema);
  }
}

module.exports = UserDaoMongo;
