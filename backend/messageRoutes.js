const express = require("express");
const database = require("./connect");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

let messageRoutes = express.Router();

messageRoutes.route("/message/:businessId").get(async (req, res) => {
  const businessId = req.params.businessId;

  try {
    let db = database.getDb();
    let data = await db
      .collection("messages")
      .aggregate([
        {
          $match: {
            businessId: new ObjectId(businessId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
      ])
      .toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRoutes
  .route("/message/:businessId")
  .post(verifyToken, async (req, res) => {
    const businessId = req.params.businessId;
    let db = database.getDb();
    let mongoObject = {
      message: req.body.message,
      messageDate: req.body.messageDate,
      userId: new ObjectId(req.user._id),
      businessId: new ObjectId(businessId),
    };
    let data = await db.collection("messages").insertOne(mongoObject);
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

module.exports = messageRoutes;
