// SYS VAR
const PORT = process.env.PORT || 5000;

// MODULE IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

// CONFIG FILES
const keys = require("./config/keys");

/*
 * This next section uses require() by itself. This instead of importing exports,
 * it runs whatever javascript code which is in that file.
 * This becomes really useful when it comes to refactoring code.
 */
require("./models/User");
require("./services/passport");

// Connects to remote MongoDB instance using mongoose
mongoose.connect(keys.mongoURI);

const app = express();

// sets up cookie usage
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Mounting routes
require("./routes/authRoutes")(app);

app.listen(PORT, err => {
  if (err) {
    console.log("Failed to start server");
    return false;
  }

  console.log(`App running on port: ${PORT}`);
});
