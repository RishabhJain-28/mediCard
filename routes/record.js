const express = require("express");
const sendRes = require("../uitl/sendRes");
const router = express.Router();
const { nanoid } = require("nanoid");
const Record = require("../models/Record");
const Link = require("../models/Link");

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

router.get("/getFromLink/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const link = await Link.findOne({ shortId });
  if (!link) {
    return sendRes(res, { data: null, error: "no link found" }, 400);
  }

  const record = await Record.findById(link.pId);
  if (!record) {
    return sendRes(res, { data: null, error: "no record found" }, 400);
  }

  sendRes(res, { data: record, error: null });
});

router.post("/genLink", async (req, res) => {
  const { id } = req.body;

  const old = await Link.findOne({ pId: id });
  if (old) {
    return sendRes(res, { data: { shortId: old.shortId }, error: null });
  }

  const shortId = nanoid(10);
  console.log("shortid : ", shortId);

  const link = new Link({
    shortId,
    pId: id,
  });
  await link.save();

  sendRes(res, {
    data: {
      shortId,
    },
    error: null,
  });
});

router.put("/update", async (req, res) => {
  const { shortId, newData } = req.body;

  const link = await Link.findOne({ shortId });
  if (!link) {
    return sendRes(res, { data: null, error: "no link found" }, 400);
  }

  const record = await Record.findById(link.pId);
  if (!record) {
    return sendRes(res, { data: null, error: "no record found " }, 400);
  }
  record.recordData = [...record.recordData, newData.recordData];
  record.reports = [...record.reports, newData.report];
  await record.save();

  sendRes(res, {
    data: {
      shortId,
      record,
    },
    error: null,
  });
});

router.delete("/link/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const link = await Link.findOneAndDelete({ shortId });
  if (!link) {
    return sendRes(res, { data: null, error: "no link found" }, 400);
  }

  sendRes(res, { data: true, error: null });
});
module.exports = router;
