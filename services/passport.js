// MODULE IMPORTS
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

// CONFIG FILES
const keys = require("../config/keys");

// MODEL IMPORTS
const User = mongoose.model("users");

// Cookie handlers (Serialize/Deserialize)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => console.log(err));
});

// Setup google oauth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // Checks if user already exists in database.
      User.findOne({ googleID: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // we already have a record with the given profile ID
            done(null, existingUser);
          } else {
            // we dont have a record, create one
            new User({
              googleID: profile.id
            })
              .save()
              .then(user => done(null, user));
          }
        })
        .catch(err => console.log(err));
    }
  )
);
