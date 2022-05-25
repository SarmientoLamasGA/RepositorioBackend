const checkUserSession = (req, res, next) => {
  console.log(req.session.username);
  if (req.session.username) {
    req.session.touch();
    next();
  } else {
    res.redirect("/api/user");
  }
};

module.exports = checkUserSession;
