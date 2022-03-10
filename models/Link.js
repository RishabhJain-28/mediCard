const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  pId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  },
});

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
