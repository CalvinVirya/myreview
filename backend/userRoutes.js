const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let userRoutes = express.Router();

userRoutes.route("/users").get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("users").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("Data not found");
  }
});

userRoutes.route("/users/:id").get(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db.collection("users").findOne({ _id: new ObjectId(id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Data not found");
  }
});

userRoutes.route("/users").post(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    joinDate: new Date(),
    reviews: [],
  };
  let data = await db.collection("users").insertOne(mongoObject);
  res.json(data);
});

userRoutes.route("/users:id").put(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      joinDate: req.body.joinDate,
      reviews: req.body.reviews,
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, mongoObject);
  res.json(data);
});

userRoutes.route("/users/:id").delete(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  res.json(data);
});

module.exports = userRoutes;
