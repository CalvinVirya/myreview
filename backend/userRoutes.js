const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

userRoutes.post("/users", async (req, res) => {
  let db = database.getDb();

  const takenEmail = await db
    .collection("users")
    .findOne({ email: req.body.email });
  if (takenEmail) {
    return res.json({ message: "Email is taken" });
  }

  const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    joinDate: new Date(),
    userImage: req.body.userImage || null, // <--- ambil dari Cloudinary
    reviews: [],
    bookmarks: [],
  };

  const data = await db.collection("users").insertOne(userData);
  res.json({ data });
});

userRoutes.route("/users/login").post(async (req, res) => {
  let db = database.getDb();

  const user = await db.collection("users").findOne({ email: req.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(req.body.password, user.password);
    if (confirmation) {
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name,
          userImage: user.userImage,
          joinDate: user.joinDate,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } else {
    res.json({ success: false, message: "User not found" });
  }
});

// userRoutes.route("/users/:id").put(async (req, res) => {
//   const id = req.params.id;
//   let db = database.getDb();
//   let mongoObject = {
//     $set: {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       joinDate: req.body.joinDate,
//       reviews: req.body.reviews,
//     },
//   };
//   let data = await db
//     .collection("users")
//     .updateOne({ _id: new ObjectId(id) }, mongoObject);
//   res.json(data);
// });

userRoutes.route("/users/:id").delete(async (req, res) => {
  const id = req.params.id;
  let db = database.getDb();
  let data = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  res.json(data);
});

userRoutes
  .route("/users/image")
  .post(upload.single("image"), async (req, res) => {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "user images",
    });

    fs.unlinkSync(req.file.path);

    const url = cloudinary.url(upload.public_id, {
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    res.json({ url });
  });

userRoutes.route("/users/bookmark").put(verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookmarkId = req.body.businessId;

    let db = database.getDb();

    const data = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { bookmarks: new ObjectId(bookmarkId) } }
      );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
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

module.exports = userRoutes;
