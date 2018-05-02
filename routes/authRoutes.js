// MODULE IMPORTS
const passport = require("passport");

// Setting up routes for OAUTH authentications
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (request, response) => {
    request.logout();
    response.send(request.user);
  });

  app.get("/api/current_user", (request, response) =>
    response.send(request.user)
  );
};
