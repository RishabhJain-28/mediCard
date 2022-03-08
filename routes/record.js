const express = require("express");
const Record = require("../models/Record");
const sendRes = require("../uitl/sendRes");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const record = await Record.findById(id);

  if (!record) return sendRes(res, { error: "Invalid record Id" }, 400);

  return sendRes(res, { data: record });
});

//! validate

router.post("/create", async (req, res) => {
  const newRecord = new Record();
  await newRecord.save();

  //! send record id over the network?///// HASHED ??
  return sendRes(res, { data: { recordId: newRecord._id } });
});

module.exports = router;
