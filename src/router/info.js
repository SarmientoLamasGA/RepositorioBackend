const { Router } = require("express");
const port = require("../../utils/minimist.port");

const router = new Router();

router.route("/").get((req, res) => {
  const inputPort = () => {
    if (port == 8080) {
      return `No se ingresó puerto, usando predeterminado(${port})`;
    } else {
      return `Puerto ingresado ${port}`;
    }
  };
  const processInfo = {
    entrada: inputPort(),
    plataforma: process.platform,
    version: process.version,
    memoriaReservada: process.memoryUsage().rss,
    directorio: process.cwd(),
    rutaDeEjecucion: process.execPath,
    processId: process.pid,
  };

  res.render("pages/processInfo", { processInfo });
});

module.exports = router;
