const fs = require("fs");
const { parse } = require("csv-parse");
const mongoose = require("mongoose");
const Login = require('../models/Login');
const bcrypt = require('bcrypt');
// const MongoClient = require("mongodb").MongoClient;
const saltRounds = 10;
const db = require('./mongo').mongoURI;
mongoose.connect(db,{
    useNewurlParser: true,
    useunifiedTopology: true,
    family:4
});

// read value from csv into array
let l = [];
fs.createReadStream('../public/sample.csv')
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

    for(i = 0; i < l.length ; ++i){
        const email = l[i][0];
        const pass = l[i][1];
        console.log(email, pass);
        const password = bcrypt.hashSync(pass, saltRounds);
        const us = await Login.findOne({ "email": email}, {_id:1});
        console.log(us);
        if(us){
          console.log("user already present");
        }
        else{
          const newLogin = new Login({email, password});
          newLogin.save()
          .then(() => {
              console.log('successfully added todo');
              // res.redirect('/');
          })
          .catch((err)=>{
              console.log(err);
          })
          console.log(email, password);
        }
    
        // save the todo object
    }
    console.log("finished");
  });

