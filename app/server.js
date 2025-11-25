const express = require("express");
const path = require("path");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Route for index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve profile picture
app.get("/profile-picture", (req, res) => {
  const imgPath = path.join(__dirname, "images/profile-1.jpg");
  if (fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    res.status(404).send("Image not found");
  }
});

// MongoDB connection
const mongoUrl = "mongodb://admin:password@mongodb"; // use localhost if Node is on host and mongodb (to connect my-app container with app logic to mongodb container using container name ie mongodb as in mongo.yaml rather than local host)in container
const databaseName = "user-account";

// Update profile
app.post("/update-profile", async (req, res) => {
  const userObj = req.body;
  userObj.userid = 1;

  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(databaseName);
    await db
      .collection("users")
      .updateOne({ userid: 1 }, { $set: userObj }, { upsert: true });
    client.close();
    res.json(userObj);
  } catch (err) {
    console.error("MongoDB error (update):", err);
    res.status(500).send({ error: "Database error" });
  }
});

// Get profile
app.get("/get-profile", async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(databaseName);
    const result = await db.collection("users").findOne({ userid: 1 });
    client.close();
    res.json(result || {});
  } catch (err) {
    console.error("MongoDB error (get):", err);
    res.json({}); // return empty object if DB not reachable
  }
});

// Start server
app.listen(3000, () => {
  console.log("Your app is available at http://localhost:3000");
});
