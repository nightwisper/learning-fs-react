// MODULE IMPORTS
const mongoose = require("mongoose");

// ES2015 destructuring
const { Schema } = mongoose;

// Creating user Model Class (Mongo Collection)
const userSchema = new Schema({
  googleID: String
});

mongoose.model("users", userSchema);
