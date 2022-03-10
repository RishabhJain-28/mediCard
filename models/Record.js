const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  recordData: [
    {
      type: Number,
      default: 0,
      required: true,
    },
  ],
  reports: {
    type: [{ type: String, type: String }],
    default: [],
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
