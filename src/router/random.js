const { Router } = require("express");
// const { fork } = require("child_process");
const puerto = require("../../utils/minimist.options").port;
const logInfo = require("../../utils/logger.info");

const router = new Router();

router.route("/:cant?").get(logInfo, async (req, res) => {
  console.log(`Corriendo en el puerto ${puerto}`);
  const cant = Number(req.query.cant ? req.query.cant : 100000000);
  // const computo = fork("./utils/randomizer", [cant]);
  // computo.send(cant);
  // computo.on("message", (msg) => {
  //   res.send(msg);
  // });
  res.send(cant);
});

module.exports = router;
