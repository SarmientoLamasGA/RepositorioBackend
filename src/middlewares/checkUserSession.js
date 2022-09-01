const checkUserSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.username = req.user.username;
    const user = req.session.username;
    if (user) {
      req.session.touch();
      next();
    }
  } else {
    res.redirect("/api/usuario");
  }
};

module.exports = checkUserSession;
