const cpus = require("os").cpus();
const port = require("../utils/minimist.options");

class InfoController {
  async getInfo(req, res) {
    {
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
    }
  }
}

module.exports = InfoController;
