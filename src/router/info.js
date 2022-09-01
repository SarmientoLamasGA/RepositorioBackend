const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const checkUserSession = require("../middlewares/checkUserSession");

const InfoController = require("../controllers/info.controller");
const infoController = new InfoController();

const router = new Router();

router.route("/").get(logInfo, checkUserSession, infoController.getInfo);

module.exports = router;
