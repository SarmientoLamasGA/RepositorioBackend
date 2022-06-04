const checkUserSession = (req, res, next) => {
  const user = req.user;
  if (user.username) {
    req.session.touch();
    next();
  } else {
    res.redirect("/api/user");
  }
};

module.exports = checkUserSession;
