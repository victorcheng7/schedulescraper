var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var Fuse = require('fuse.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/search", (req, res) => {
    /*
		res.header("Access-Control-Allow-Origin", "");
		res.header('Access-Control-Allow-Credentials', 'false');
		res.header('Access-Control-Allow-Methods', 'POST');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    */
    fs.readFile('./winter2018.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var a = JSON.parse(data);
      var toSearch = req.query;
      console.log("Searching for", toSearch.q);
      //TODO find max length of
      var options = {
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        includeScore: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: toSearch.q.length,
        minMatchCharLength: 1,
        keys: [
          "Subject",
          "Quarter",
          "CourseLevel",
          "CourseID",
          "Title",
          "Full",
          "Instructor",
          "Days",
          "Time",
          "Location",
          "MaxEnrolledCount",
          "CurrentEnrolled",
          "FullTitle",
          //"Description",
          "PreRequisite",
          "College",
          "Units",
          "Grading"
        ]
      };
      var fuse = new Fuse(a, options); // "list" is the item array
      var result = fuse.search(toSearch.q);

      var exactResult = [];
      for(var i in a){
        if(a[i].Description.indexOf(toSearch) != -1) exactResult.push(a[i]);
      }
      var filteredResult = result.filter((e) => {
        return e.score <= 0.2;
      });
      res.send(filteredResult.concat(exactResult));
    });
});

app.get("/getAll", (req, res) => {
    fs.readFile('./winter2018.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.send(JSON.parse(data));
    });
});


app.listen(process.env.PORT || 5000, () => console.log("Server started"));
