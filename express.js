var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var waitlist = [
  {
    routeName: "firdsfsdfdsffstreg",
    name: "First asdfsdffsfsfReg",
    phone: 8005551234234234234,
    email: "heathrossdffsdfsft@gmail.com",
    uniqueID: 1333
  }
 ];

var tables = [
  {
    routeName: "firstreg",
    name: "First Reg",
    phone: 8005551234,
    email: "heathrost@gmail.com",
    uniqueID: 1
  },
  {
    routeName: "secondreg",
    name: "Second RegEx",
    phone: 5558001234,
    email: "hea222222@gmail.com",
    uniqueID: 2
  },
  {
    routeName: "thirdreg",
    name: "Third RegEx",
    phone: 1234567891,
    email: "h22@gmail.com",
    uniqueID: 3
  }
];

// Routes
// =============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.post("/reservation", function(req, res) {
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  console.log(newReservation);
  tables.push(newReservation);
  res.json(newReservation);
});

// app.get("/api/tables", function(req, res) {
//   return res.json(tables);
// });

app.get("/api/tables", function(req, res) {
  var chosen = req.params.tables;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  var chosen = req.params.waitlist;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < waitlist.length; i++) {
      if (chosen === waitlist[i].routeName) {
        return res.json(waitlist[i]);
      }
    }
    return res.json(false);
  }
  return res.json(waitlist);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
