const fs = require("fs");
const { parse } = require("csv-parse");
const Login = require('../models/Login');
// const MongoClient = require("mongodb").MongoClient;

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
  .on("end", function () {
    // console.log(l)
    // write to db

    for(i = 0; i < l.length ; ++i){
        const email = l[i][0];
        const password = l[i][1];
        const newLogin = new Login({email, password})
    
        // save the todo object
    
        newLogin.save()
        .then(() => {
            console.log('successfully added todo');
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log(email, password);
    }
    console.log("finished");
  });

