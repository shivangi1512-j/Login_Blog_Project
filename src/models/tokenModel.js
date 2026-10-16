const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
