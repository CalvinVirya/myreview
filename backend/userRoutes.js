const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

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

  const takenEmail = await db
    .collection("users")
    .findOne({ email: req.body.email });

  if (takenEmail) {
    res.json({ message: "Email is taken" });
  } else {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    let mongoObject = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      joinDate: new Date(),
      reviews: [],
    };
    let data = await db.collection("users").insertOne(mongoObject);
    res.json(data);
  }
});

userRoutes.route("/users/login").post(async (req, res) => {
  let db = database.getDb();

  const user = await db.collection("users").findOne({ email: req.body.email });

  if (user) {
    let confirmation = bcrypt.compare(req.body.password, user.password);
    if (confirmation) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } else {
    res.json({ success: false, message: "User not found" });
  }
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
