const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const reviews = require("./reviewRoutes");
const users = require("./userRoutes");
const businesses = require("./businessRoutes");
const messages = require("./messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(reviews);
app.use(users);
app.use(businesses);
app.use(messages);

let isConnected = false;

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "MyReview API is running",
  });
});

async function initDB() {
  if (!isConnected) {
    await connect.connectToServer();
    const db = connect.getDb();
    await db.collection("business").createIndex({ position: "2dsphere" });
    console.log("2dsphere index ready!");
    isConnected = true;
  }
}

initDB();

module.exports = app;
