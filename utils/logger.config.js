const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: { type: "console" },
    warn: { type: "file", filename: "warn.log" },
    error: { type: "file", filename: "error.log" },
    loggerConsola: {
      type: "logLevelFilter",
      appender: "consola",
      level: "info",
    },
    loggerWarm: { type: "logLevelFilter", appender: "consola", level: "warn" },
    loggerError: {
      type: "logLevelFilter",
      appender: "consola",
      level: "error",
    },
  },
  categories: {
    default: { appenders: ["console"], level: "trace" },
    consola: { appenders: ["console"], level: "debug" },
    fileWarn: { appenders: ["warn", "console"], level: "warn" },
    fileError: { appenders: ["error", "console"], level: "error" },
    fileFatal: { appenders: ["error", "console"], level: "fatal" },
  },
});

module.exports = log4js;
