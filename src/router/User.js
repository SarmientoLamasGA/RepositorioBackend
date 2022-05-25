const { Router } = require("express");
const auth = require("../../utils/auth");
const checkUserSession = require("../../utils/checkUserSession");

const router = new Router();

router.route("/").get(async (req, res) => {
  res.redirect("/api/user/login");
});

router
  .route("/login")
  .get(async (req, res) => {
    res.render("pages/login");
  })
  .post(async (req, res) => {
    try {
      const { user, password } = req.body;
      if (user !== "pepe" || password !== "pepepass") {
        return res.send("Error usuario");
      }
      req.session.password = password;
      req.session.username = user;
      req.session.admin = true;

      res.redirect("/api/user/sesion");
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/sesion")
  .get(checkUserSession, async (req, res) => {
    const expires = req.session.cookie._expires.toTimeString();
    res.render("pages/userSession", {
      user: req.session.username,
      expires: expires,
    });
  })
  .post(async (req, res) => {
    res.redirect("/api/user/logout");
  });

router.route("/logout").get(checkUserSession, async (req, res) => {
  try {
    const name = req.session.username;
    console.log(req.session);
    req.session.destroy((err) => {
      if (!err) {
        console.log(req.session);
        res.render("pages/logout", { name: name });
      } else res.send("error");
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/privado").get(checkUserSession, auth, async (req, res) => {
  try {
    res.send("Este mensaje solo es visible si sos admin");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
