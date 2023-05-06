const csv = require("csv-parse");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function importData(filePath, url, dbName, collectionName) {
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csv({ delimiter: ",", from_line: 2 }))
      .on('data', (row) => {
        const passwordHash = bcrypt.hashSync(row.password, saltRounds);
        console.log(row.email, passwordHash);
        data.push({
          email: row.email,
          password: passwordHash,
        });
      })
      .on('end', () => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
          if (err) throw err;
  
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
  
          collection.insertMany(data, (err, result) => {
            if (err) throw err;
            console.log(`${result.insertedCount} documents inserted into ${collectionName} collection`);
            client.close();
          });
        });
      });
}

module.exports = importData;
