const log4js = require("./logger.config");

const getLoggerFile = log4js.getLogger("fileError");

const logError = (req) => {
  getLoggerFile.error(`Error al acceder a un producto inexistente. ID: ${req}`);
};

module.exports = logError;
