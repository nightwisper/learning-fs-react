const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(PORT, err => {
  if (err) {
    console.log("Failed to start server");
    return false;
  }

  console.log(`App running on port: ${PORT}`);
});
