const { Router } = require("express");
const router = new Router();
const twilio = require("twilio");

const accountSid = "AC709d1d5230e8bb894d5e20efef592320";
const authToken = "ee6d0b047eeb4029fd0ad6a67dbd78eb";

const client = twilio(accountSid, authToken);

router.route("/").get(async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "Mensaje de prueba",
      from: "+19105863602",
      to: "+541124590314",
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
