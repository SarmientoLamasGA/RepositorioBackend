const { Router } = require("express");
const router = new Router();

router.route("/").get((req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

module.exports = router;
