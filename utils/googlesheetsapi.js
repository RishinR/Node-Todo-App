const { google } = require("googleapis");
const sheets = google.sheets("v4");
const credentials = require("./credentials.json");

// Replace with the ID of your Google Sheet
const spreadsheetId = "YOUR_SPREADSHEET_Ihttps://docs.google.com/spreadsheets/d/1DsplsWq0UeronlcPNfiAUYuAjdl1QSDGMewkhqDAGsg/edit?usp=sharing";

// Replace with the range of cells you want to retrieve
const range = "Sheet1";

// Authorize with the Google Sheets API using your credentials
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

// Get the data from the sheet
async function getData() {
  const client = await auth.getClient();
  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });
  const data = res.data.values;
  // Transform the data and insert it into your database
  console.log(data);
}

getData();
