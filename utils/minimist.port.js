const parseArgs = require("minimist");

const options = { default: { port: "8080" } };
const argv = parseArgs(process.argv.slice(2), options);
const port = argv.port;

module.exports = port;
