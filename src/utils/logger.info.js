const log4js = require("./logger.config");

const getLogger = log4js.getLogger();

const logInfo = (req, res, next) => {
  getLogger.info(`Ingresado a ruta ${req.baseUrl}`);
  next();
};

module.exports = logInfo;
