const { Router } = require("express");
const logInfo = require("../utils/logger.info");
const checkUserSession = require("../middlewares/checkUserSession");

//DB
const ChatFactory = require("../factory/chatFactory");
const factory = new ChatFactory();
const chatDB = factory.create();

const router = new Router();

router.route("/").get(logInfo, checkUserSession, async (req, res) => {
  try {
    const user = req.user;
    const userUId = user.UId;

    res.render("pages/chats", { data: await chatDB.getById(userUId), user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
