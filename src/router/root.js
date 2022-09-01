const { Router } = require("express");
const router = new Router();

router.route("/").get((req, res) => {
  return res.redirect("/api/productos");
});

module.exports = router;
