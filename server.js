// server.js
// where your node app starts

// init project
require('dotenv').config();
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

// enable reverse proxy support, populating req.ip values with socket address and X-Forwarded header 
app.enable("trust proxy");

app.get("/api/whoami", function (req, res) {

  //req.ip gets client ip address in Express
  let trueIp = req.ip;

  // req.headers["accept-language"] gets the language/locale of client's browser.
  let trueLang = req.headers['accept-language'];

  // req.headers['user-agent'] gets client OS and browser
  let trueSoft = req.headers['user-agent'];

  res.json({
    ipaddress: trueIp,
    language: trueLang,
    software: trueSoft
    });
});


let defaultPort = process.env.PORT || 3000;

// listen for requests
var listener = app.listen(defaultPort, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
