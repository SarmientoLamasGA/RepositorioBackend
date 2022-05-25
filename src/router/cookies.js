const { Router } = require("express");
const cookieParser = require("cookie-parser");

const router = new Router();

router.use(cookieParser());

router.route("/").get(async (req, res) => {
  res.cookie("server", "express").send("cookie");
});

router.route("/ex").get(async (req, res) => {
  res.cookie("serverEx", "express ex", { maxAge: 10000 }).send("cookie");
});

router.route("/all").get(async (req, res) => {
  res.send(req.cookies.server + req.cookies.serverEx + " cookies");
});

router.route("/clear").get(async (req, res) => {
  res.clearCookie("server").send("clear");
});

module.exports = router;
