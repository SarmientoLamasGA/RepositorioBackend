const parseArgs = require("minimist");

const basic = { default: { port: "8080", mode: "fork" } };
const argv = parseArgs(process.argv.slice(2), basic);
const options = argv;

module.exports = options;
