const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateEntry: {
    type: Date,
    default: Date.now
  }
}, {collection: "Users"});

module.exports = mongoose.model("User", userSchema);