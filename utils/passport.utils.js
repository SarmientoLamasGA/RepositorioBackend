const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const DaoUserMongo = require("../src/daos/users/usersDaoMongo");
const userMongo = new DaoUserMongo();

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userMongo.collection.findOne({ username });
      if (!user) {
        console.log(`No se encontró el usuario ${username}`);
        return done(null, false);
      }
      const validPassword = await bcrypt.compare(password, user.password);
      console.log(validPassword);
      if (validPassword) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const userExists = await userMongo.collection.findOne({ username });
        if (userExists) {
          console.log("El usuario ya existe");
          return done(null, false);
        }

        const address = `${req.body.country}, ${req.body.estate}, ${req.body.city}, ${req.body.address}`;

        const newUser = {
          username: username,
          email: req.body.email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          name: req.body.name,
          lastName: req.body.lastName,
          address: req.body.address,
          phone: req.body.phone,
          address: address,
          profilePicture: req.body.profilePicture,
        };

        const user = await userMongo.collection.insertMany(newUser);
        return done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  userMongo.collection.findById(user, done);
});

module.exports = passport;
