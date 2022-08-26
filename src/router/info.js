const { Router } = require("express");
const port = require("../utils/minimist.options");
const logInfo = require("../utils/logger.info");
const cpus = require("os").cpus();
const checkUserSession = require("../middlewares/checkUserSession");

const router = new Router();

router.route("/").get(logInfo, checkUserSession, async (req, res) => {
  const inputPort = () => {
    if (port == 8080) {
      return `No se ingresó puerto, usando predeterminado(${port})`;
    } else {
      return `Puerto ingresado ${port}`;
    }
  };
  const user = req.user;
  const processInfo = {
    entrada: inputPort(),
    plataforma: process.platform,
    version: process.version,
    memoriaReservada: process.memoryUsage().rss,
    directorio: process.cwd(),
    rutaDeEjecucion: process.execPath,
    processId: process.pid,
    cpuTotal: cpus.length,
    cpuInfo: cpus,
  };

  res.render("pages/processInfo", { processInfo, user });
});

module.exports = router;
