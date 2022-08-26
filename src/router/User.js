const { Router } = require("express");
const auth = require("../middlewares/auth");
const checkUserSession = require("../middlewares/checkUserSession");
const passport = require("../utils/passport.utils");
const logInfo = require("../utils/logger.info");

const DaoUserMongo = require("../daos/users/usersDaoMongo");
const userMongo = new DaoUserMongo();

const router = new Router();

router.route("/").get(async (req, res) => {
  res.redirect("/api/user/login");
});

router
  .route("/login")
  .get(logInfo, async (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/api/user/sesion");
    } else {
      const user = {
        username: "Invitado",
      };
      res.render("pages/login", { user: user });
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
  .get(logInfo, async (req, res) => {
    res.render("pages/signup", { user: req.user });
  })
  .post(
    passport.authenticate("signup", {
      failureRedirect: "/api/user/signup-error",
    }),
    async (req, res) => {
      try {
        //REVISAR USUARIO DEVUELVE ARRAY
        const user = req.user;
        console.log(user);
        if (!user) {
          res.render("pages/userInfo", {
            user: user,
            error: true,
            infoError: "Error en el registro",
          });
        } else {
          res.render("pages/userInfo", {
            user: user,
            error: false,
            info: "Registrado",
          });
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
  .get(logInfo, checkUserSession, async (req, res) => {
    const user = req.user;
    const expires = req.session.cookie._expires.toTimeString();
    res.render("pages/userSession", {
      user: user,
      expires: expires,
    });
  })
  .post(async (req, res) => {
    let user = req.user;
    const expires = req.session.cookie._expires.toTimeString();
    const newImage = req.body.newImage;
    user.profilePicture = newImage;
    res.render("pages/userSession", {
      user: user,
      expires: expires,
      updateData: await userMongo.update(user.UId, user),
    });
  });

router.route("/logout").get(logInfo, async (req, res) => {
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

router
  .route("/privado")
  .get(logInfo, checkUserSession, auth, async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      res.render("Este mensaje solo es visible si sos admin", { user: user });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
