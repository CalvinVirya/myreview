const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

let businessRoutes = express.Router();

businessRoutes.route("/business").get(async (req, res) => {
  const userLat = parseFloat(req.query.userLat);
  const userLng = parseFloat(req.query.userLng);

  try {
    let db = database.getDb();
    if (!userLat || !userLng) {
      return res.status(400).json({ message: "Missing userLat or userLng" });
    }

    let data = await db
      .collection("business")
      .aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [userLng, userLat] },
            distanceField: "distance",
            spherical: true,
          },
        },
      ])
      .toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.route("/business/search").get(async (req, res) => {
  const userLat = parseFloat(req.query.userLat);
  const userLng = parseFloat(req.query.userLng);
  const prefix = req.query.prefix || "";
  const category = req.query.category || "";

  try {
    let db = database.getDb();

    if (!userLat || !userLng) {
      return res.status(400).json({ message: "Missing userLat or userLng" });
    }

    const matchQuery = {};

    if (prefix.trim() !== "") {
      matchQuery.title = { $regex: `^${prefix}`, $options: "i" };
    }

    if (category.trim() !== "" && category !== "all") {
      matchQuery.category = category;
    }

    let data = await db
      .collection("business")
      .aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [userLng, userLat] },
            distanceField: "distance",
            spherical: true,
          },
        },
        {
          $match: matchQuery,
        },
      ])
      .toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.route("/business/address").get(async (req, res) => {
  const { lat, lon } = req.query;
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );

  res.json(response.data);
});

businessRoutes.route("/business/:id").get(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db.collection("business").findOne({ _id: new ObjectId(id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Data not found");
  }
});

businessRoutes.route("/business").post(verifyToken, async (req, res) => {
  let db = database.getDb();

  let mongoObject = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    position: {
      type: "Point",
      coordinates: [req.body.position[1], req.body.position[0]],
    },
    address: req.body.address,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    imageUrl: req.body.imageUrl,
    userId: new ObjectId(req.user._id),
    reviews: [],
    avgRating: 0,
    totalReviews: 0,
    ratingSum: 0,
  };

  let data = await db.collection("business").insertOne(mongoObject);

  res.json(data);
});

businessRoutes.route("/business/:id").delete(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db
    .collection("business")
    .deleteOne({ _id: new ObjectId(id) });
  res.json(data);
});

businessRoutes
  .route("/business/image")
  .post(verifyToken, upload.single("image"), async (req, res) => {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "business images",
    });

    fs.unlinkSync(req.file.path);

    const url = cloudinary.url(upload.public_id, {
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    res.json({ url });
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

module.exports = businessRoutes;
