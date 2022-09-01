const passport = require("../utils/passport.utils");

const DaoUserMongo = require("../daos/users/usersDaoMongo");
const userMongo = new DaoUserMongo();

class UserController {
  async getLogin(req, res) {
    {
      if (req.isAuthenticated()) {
        res.redirect("/api/usuario/sesion");
      } else {
        const user = {
          username: "Invitado",
        };
        res.render("pages/login", { user: user });
      }
    }
  }

  async postLogin(req, res) {
    {
      try {
        req.session.username = req.user.username;
        res.redirect("/api/usuario/sesion");
      } catch (err) {
        res.render("Ha ocurrido un error");
      }
    }
  }
  async logError(req, res) {
    {
      res.render("pages/userInfo", {
        error: true,
        infoError: "Usuario o contraseña incorrectos",
      });
    }
  }
  async getSignUp(req, res) {
    {
      res.render("pages/signup", { user: req.user });
    }
  }
  async signUp(req, res) {
    {
      try {
        const user = req.user;
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
        res.render("Ha ocurrido un error");
      }
    }
  }
  async signUpError(req, res) {
    {
      res.render("pages/userInfo", {
        error: true,
        infoError: "El usuario ya existe",
      });
    }
  }
  async sessionProfile(req, res) {
    {
      const user = req.user;
      const expires = req.session.cookie._expires.toTimeString();
      res.render("pages/userSession", {
        user: user,
        expires: expires,
      });
    }
  }
  async newPhoto(req, res) {
    {
      let user = req.user;
      const expires = req.session.cookie._expires.toTimeString();
      const newImage = req.body.newImage;
      user.profilePicture = newImage;
      res.render("pages/userSession", {
        user: user,
        expires: expires,
        updateData: await userMongo.update(user.UId, user),
      });
    }
  }

  async logOut(req, res) {
    {
      try {
        req.logout((err) => {
          if (err) {
            res.render("Ha ocurrido un error");
          }
          res.redirect("/api/usuario");
        });
      } catch (err) {
        res.render("Ha ocurrido un error");
      }
    }
  }

  async private(req, res) {
    {
      try {
        const user = req.user;
        res.send("Este mensaje solo es visible si sos admin");
      } catch (err) {
        res.render("Ha ocurrido un error");
      }
    }
  }
}

module.exports = UserController;
