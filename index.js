// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { timeStamp } = require("console");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// your API/:date? endpoint...
app.get("/api/:date?", function (req, res) {
  console.log(`req.params.date is ${req.params.date}`);
  const retDate = new Date(req.params.date);
  const retDateUtcString = retDate.toUTCString();

  if (req.params.date === undefined || req.params.date === null) {
    res.json({
      unix: Date.now(),
      utc: Date.now(),
    });
  } else if (isNaN(retDate) === false)
    res.json({
      unix: retDate.getTime(),
      utc: retDateUtcString,
    });
  else {
    const retDateN = new Date(Number(req.params.date));
    const retDateUtcString = retDateN.toUTCString();
    if (isNaN(retDateN) === false) {
      res.json({
        unix: Number(req.params.date),
        utc: retDateUtcString,
      });
    } else {
      res.json({
        error: "Invalid Date",
      });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
