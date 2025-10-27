const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let reviewRoutes = express.Router();

reviewRoutes.route("/reviews").get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("reviews").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("Data not found");
  }
});

reviewRoutes.route("/reviews/:id").get(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db.collection("reviews").findOne({ _id: new ObjectId(id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Data not found");
  }
});

reviewRoutes.route("/reviews").post(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    title: req.body.title,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
  };
  let data = await db.collection("reviews").insertOne(mongoObject);
  res.json(data);
});

reviewRoutes.route("/reviews:id").put(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      dateCreated: req.body.dateCreated,
    },
  };
  let data = await db
    .collection("reviews")
    .updateOne({ _id: new ObjectId(id) }, mongoObject);
  res.json(data);
});

reviewRoutes.route("/reviews/:id").delete(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db
    .collection("reviews")
    .deleteOne({ _id: new ObjectId(id) });
  res.json(data);
});

module.exports = reviewRoutes;
