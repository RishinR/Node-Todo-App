const express = require("express");
const mongoose = require("mongoose");
// const sheet = require("./utils/mysheetapi");
const app = express();

//connect to mongodb
const db = require("./utils/mongo").mongoURI;
mongoose.connect(db,{
    useNewurlParser: true,
    useunifiedTopology: true,
    family:4
    });
//middlewares
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public"));
app.set("view engine", "ejs");

// function to convert the csv into database
const { csvData } = require("./utils/mysheetapi");
csvData().catch((err) => console.error(err));


// routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));
app.use(require("./routes/login"));


// listen to server
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

/*
In my node.js app i have a public folder which contains the sample.csv
and utils folder which contains the mysheetapi.js which contains a fucnction
called csvData which i need to call in app.js but i im having errors with it please do resolve it 

the files are attached  here with

//sample.csv

email,password
jomon@email.com,0000
george@email.com,123456
gregory@email.com,789456
jacob@email.com,789456
jaquar@email.com,147258
sarika@email.com,09999
rishin@email.com,1245
hari@email.com,1111

// app.js
const express = require("express");
const mongoose = require("mongoose");
// const sheet = require("./utils/mysheetapi");
const app = express();
//connect to mongodb
const filePath = require('./public/sample.csv');
const db = require("./utils/mongo").mongoURI;
mongoose.connect(db,{
    useNewurlParser: true,
    useunifiedTopology: true,
    family:4
    });
//middlewares
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("public"));
app.set("view engine", "ejs");

// csv to db
// Replace with your MongoDB database URL
// const dbName = "node_system"; // Replace with your database name
// const collectionName = "logins"; // Replace with your collection name
// const csvFilePath = require('./public/sample.csv');


const { csvData } = require("./utils/mysheetapi");
csvData().catch((err) => console.error(err));



// routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));
app.use(require("./routes/login"));
//

// listen to server
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

//mysheetapi.js
const fs = require("fs");
const { parse } = require("csv-parse");
const mongoose = require("mongoose");
const Login = require("../models/Login");
const bcrypt = require("bcrypt");
// const MongoClient = require("mongodb").MongoClient;
const saltRounds = 10;
const db = require("./mongo").mongoURI;
mongoose.connect(db, {
  useNewurlParser: true,
  useunifiedTopology: true,
  family: 4,
});

// read value from csv into array
async function csvData() {
  let l = [];
  fs.createReadStream('../public/sample.csv')
    // .catch((err) => console.error(err))
    .on("error", (err) => {
      console.error(err);
    })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      // console.log(row);
      l.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", async function () {
      // console.log(l)
      // write to db

      for (i = 0; i < l.length; ++i) {
        const email = l[i][0];
        const pass = l[i][1];
        console.log(email, pass);
        const password = bcrypt.hashSync(pass, saltRounds);
        const us = await Login.findOne({ email: email }, { _id: 1 });
        console.log(us);
        if (us) {
          console.log("user already present");
        } else {
          const newLogin = new Login({ email, password });
          newLogin
            .save()
            .then(() => {
              console.log("successfully added todo");
              // res.redirect('/');
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(email, password);
        }

        // save the todo object
      }
      console.log("finished");
    });
};

csvData();

module.exports = { csvData: csvData };


im getting this error : jomon@email.com,0000
     ^

SyntaxError: Invalid or unexpected token
*/
