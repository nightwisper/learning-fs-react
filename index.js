const PORT = process.env.PORT || 5000;

const express = require("express");
require("./services/passport");

const app = express();
require("./routes/authRoutes")(app);

app.listen(PORT, err => {
  if (err) {
    console.log("Failed to start server");
    return false;
  }

  console.log(`App running on port: ${PORT}`);
});
