const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const reviews = require("./reviewRoutes");
const users = require("./userRoutes");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(reviews);
app.use(users);

app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
