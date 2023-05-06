const express = require("express");
const mongoose = require("mongoose");
const sheet = require("./utils/sheetapi");
const app = express();

//connect to mongodb
const db = require("./utils/mongo").mongoURI;
mongoose.connect(db, {
  useNewurlParser: true,
  useunifiedTopology: true,
});

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// csv to db
// Replace with your MongoDB database URL
const dbName = "node_system"; // Replace with your database name
const collectionName = "logins"; // Replace with your collection name
const csvFilePath = require('./public/sample.csv');


importData(csvFilePath, db, dbName, collectionName).catch((err) => {
  console.error(err);
});

// routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));
app.use(require("./routes/login"));
//

// listen to server
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
