const bCrypt = require("bcrypt");

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

module.exports = isValidPassword;
