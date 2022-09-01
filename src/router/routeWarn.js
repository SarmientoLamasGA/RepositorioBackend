const { Router } = require("express");
const logWarn = require("../utils/logger.warn");

const router = new Router();

router.route("*").get(logWarn, (req, res) => {
  res.redirect("/");
});

module.exports = router;
