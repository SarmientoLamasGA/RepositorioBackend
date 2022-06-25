const log4js = require("./logger.config");

const getLoggerFile = log4js.getLogger("fileWarn");

const logWarn = (req, res, next) => {
  getLoggerFile.warn(`Acceso a página inexistente: ${req.baseUrl}`);
  next();
};

module.exports = logWarn;
