const { Router } = require("express");
const router = new Router();

router.route("/").get((req, res) => {
  const logged = req.user;
  if (!logged) {
    return res.redirect("/api/usuario");
  }
  return res.redirect("/api/productos");
});

module.exports = router;
