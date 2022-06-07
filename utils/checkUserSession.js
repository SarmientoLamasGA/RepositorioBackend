const checkUserSession = (req, res, next) => {
  req.session.username = req.user.username;
  const user = req.session.username;
  if (user) {
    req.session.touch();
    next();
  }
  if (!user) {
    res.redirect("/api/user");
  }
};

module.exports = checkUserSession;
