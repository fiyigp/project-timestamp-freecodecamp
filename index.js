// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
  const date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get("/api/:date", function (req, res) {
  const regexDate = /\d{4}[-]\d{2}[-]\d{2}/;
  const regexTime = /^\d+$/;
  const regexGMT = /\d{2}[ ][A-Za-z]{3,9}[ ]\d{4}[,][ ][G][M][T]/;
  if (regexDate.test(req.params.date) || regexTime.test(req.params.date) || regexGMT.test(date)) {
    const paramDate = (regexTime.test(req.params.date)) ? parseInt(req.params.date) : req.params.date;
    const date = new Date(paramDate);
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else {
    res.json({error: "Invalid date"});
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
