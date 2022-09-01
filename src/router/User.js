const { Router } = require("express");
const auth = require("../middlewares/auth");
const checkUserSession = require("../middlewares/checkUserSession");
const passport = require("../utils/passport.utils");
const logInfo = require("../utils/logger.info");

const UserController = require("../controllers/user.controller");
const userController = new UserController();

const router = new Router();

router.route("/").get(async (req, res) => {
  res.redirect("/api/usuario/login");
});

router
  .route("/login")
  .get(logInfo, userController.getLogin) //Lleva al login
  .post(
    passport.authenticate("login", {
      failureRedirect: "/api/user/login-error",
    }),
    userController.postLogin
  ); //Se realiza el post del login

router.route("/login-error").get(logInfo, userController.logError); //Se da error al dar datos erroneos

router
  .route("/signup")
  .get(logInfo, userController.getSignUp) //Se lleva al registro
  .post(
    passport.authenticate("signup", {
      failureRedirect: "/api/user/signup-error",
    }),
    userController.signUp //Se realiza el registro de los datos
  );

router.route("/signup-error").get(logInfo, userController.signUpError); //Se indica que ya hay un usuario con el mismo nombre

router
  .route("/sesion")
  .get(logInfo, checkUserSession, userController.sessionProfile) //Se lleva al perfil de la sesion iniciada
  .post(checkUserSession, userController.newPhoto); //Se hace el post de la nueva imagen de perfil

router.route("/logout").get(logInfo, userController.logOut); //Se realiza el logOut

router
  .route("/privado")
  .get(logInfo, checkUserSession, auth, userController.private); //Se lleva a sección privada, solo para admins

module.exports = router;
