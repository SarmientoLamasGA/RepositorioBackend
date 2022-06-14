const { Router } = require("express");
const { fork } = require("child_process");

const router = new Router();

router.route("/:cant?").get(async (req, res) => {
  const cant = Number(req.query.cant ? req.query.cant : 100000000);
  const computo = fork("./utils/randomizer", [cant]);
  computo.send(cant);
  computo.on("message", (msg) => {
    res.send(msg);
  });
});

module.exports = router;
