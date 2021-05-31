const passport = require("passport");

const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;

import { userAuthModel } from "./../models/userAuth";

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  User.findOne({ username: username }, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    function (username, password, done) {
      userAuthModel.findOne(
        { $or: [{ username: username }, { email: username }] },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: "Incorrect Username or Password",
            });
          }
          if (
            !(
              crypto
                .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
                .toString("hex") == user.password
            )
          ) {
            return done(null, false, {
              message: "Incorrect Username or Password",
            });
          }
          return done(null, user);
        }
      );
    }
  )
);
