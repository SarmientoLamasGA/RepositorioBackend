const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("error de autorización!");
};

module.exports = auth;
