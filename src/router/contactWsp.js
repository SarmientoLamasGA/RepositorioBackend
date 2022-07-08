const { Router } = require("express");
const router = new Router();
const twilio = require("twilio");

const accountSid = "AC709d1d5230e8bb894d5e20efef592320";
const authToken = "ee6d0b047eeb4029fd0ad6a67dbd78eb";

const client = twilio(accountSid, authToken);

router.route("/").get(async (req, res) => {
  try {
    client.messages
      .create({
        body: "Your appointment is coming up on July 21 at 3PM",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5491124590314",
      })
      .then((message) => console.log(`Message sid: ${message.sid}`))
      .done();
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
