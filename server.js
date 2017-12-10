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
    var toSearch = req.query.q;
    console.log("Searching for", toSearch);

    let data = function(filename){
      return new Promise(function(resolve, reject) {
        fs.readFile(filename, 'utf8', (err, data) => {
          if(err) reject(err);
          resolve(JSON.parse(data));
        })
      })
    }

    function looseSearch(toSearch, a){
      var options = {
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        includeScore: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: toSearch.length,
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
      var result = fuse.search(toSearch);

      var exactResult = [];
      for(var i in a){
        if(a[i].Description.indexOf(toSearch) != -1) exactResult.push(a[i]);
      }
      var filteredResult = result.filter((e) => {
        return e.score <= 0.2;
      });

      console.log(filteredResult.concat(exactResult));
      return filteredResult.concat(exactResult);
    }

    function exactSearch(toSearch, a){

    }

    data('./output.txt').then(a => {
      var looseSearchResult = looseSearch(toSearch, a);
      var exactSearchResult = exactSearch(toSearch, a);

      res.send(looseSearchResult);
    });
});

app.get("/getAll", (req, res) => {
    fs.readFile('./output.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.send(JSON.parse(data));
    });
});

app.get("/getSuggestionList", (req, res) => {
    fs.readFile('./suggestionList.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.send(JSON.parse(data));
    });
});


app.listen(process.env.PORT || 5000, () => console.log("Server started"));
