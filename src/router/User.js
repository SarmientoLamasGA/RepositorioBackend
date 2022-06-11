const { Router } = require("express");
const auth = require("../../utils/auth");
const checkUserSession = require("../../utils/checkUserSession");
const passport = require("../../utils/passport.utils");

const router = new Router();

router.route("/").get(async (req, res) => {
  res.redirect("/api/user/login");
});

router
  .route("/login")
  .get(async (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/api/user/sesion");
    } else {
      res.render("pages/login");
    }
  })
  .post(
    passport.authenticate("login", {
      failureRedirect: "/api/user/login-error",
    }),
    async (req, res) => {
      try {
        req.session.username = req.user.username;
        res.redirect("/api/user/sesion");
      } catch (err) {
        console.log(err);
      }
    }
  );

router.route("/login-error").get(async (req, res) => {
  res.render("pages/userInfo", {
    error: true,
    infoError: "Usuario o contraseña incorrectos",
  });
});

router
  .route("/signup")
  .get(async (req, res) => {
    res.render("pages/signup");
  })
  .post(
    passport.authenticate("signup", {
      failureRedirect: "/api/user/signup-error",
    }),
    async (req, res) => {
      try {
        const user = req.user;
        if (!user) {
          res.render("pages/userInfo", {
            error: true,
            infoError: "Error en el registro",
          });
        } else {
          res.render("pages/userInfo", { error: false, info: "Registrado" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  );

router.route("/signup-error").get(async (req, res) => {
  res.render("pages/userInfo", {
    error: true,
    infoError: "El usuario ya existe",
  });
});

router
  .route("/sesion")
  .get(checkUserSession, async (req, res) => {
    const user = req.user;
    const expires = req.session.cookie._expires.toTimeString();
    res.render("pages/userSession", {
      user: user.username,
      expires: expires,
    });
  })
  .post(async (req, res) => {
    console.log("redirect");
    res.redirect("/api/user/logout");
  });

router.route("/logout").get(async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/api/user");
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
