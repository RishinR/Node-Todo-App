const fs = require("fs");
const { parse } = require("csv-parse");
const mongoose = require("mongoose");
const Login = require("../models/Login");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("./mongo").mongoURI;
// mongoose.connect(db, {
//   useNewurlParser: true,
//   useunifiedTopology: true,
//   family: 4,
// });

async function csvData() {
  const csvFilePath = __dirname + "/../public/sample.csv"; // use __dirname to get the absolute path
  let l = [];
  fs.createReadStream(csvFilePath)
    .on("error", (err) => {
      console.error(err);
    })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      l.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", async function () {
      for (i = 0; i < l.length; ++i) {
        const email = l[i][0];
        const pass = l[i][1];
        // encrypt the password before pushing it into db
        const password = bcrypt.hashSync(pass, saltRounds);
        const us = await Login.findOne({ email: email }, { _id: 1 });
        if (us) {
          console.log("user already present");
        } else {
          const newLogin = new Login({ email, password });
          newLogin
            .save()
            .then(() => {
              console.log("successfully added todo");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      console.log("finished");
    });
}

module.exports = { csvData: csvData };
