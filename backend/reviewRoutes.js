const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

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

reviewRoutes.route("/reviews").post(verifyToken, async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    title: req.body.title,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    userId: req.user._id,
    name: req.user.name,
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

function verifyToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

module.exports = reviewRoutes;
