var fs = require('fs');
var nlp = require('compromise');

function sanitize(){
  fs.readFile('./output.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var a = JSON.parse(data);
    console.log(a[0]);
/*
    for(var i in a){
      a[i].Days = dayToArray(a[i].Days);
      a[i].Quarter = a[i].Quarter.trim();
      a[i].Subject = a[i].Subject.split("-")[0].trim();
      a[i].Instructor = a[i].Instructor.split("\n")[0].trim();
      a[i].CourseID = a[i].CourseID.split("\n")[0].trim();
    }

    fs.writeFile("./output.txt", JSON.stringify(a), function(err){
      if(err) return console.log(err);
      console.log("Filed saved!");
    });*/
  });
}

function createSuggestionList(){
  fs.readFile('./output.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var a = JSON.parse(data);

    fo
    /*
    fs.writeFile("./suggestionList.txt", JSON.stringify(a), function(err){
      if(err) return console.log(err);
      console.log("Filed saved!");
    });*/
  });
}


function clean(a){
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Quarter = a[i].Quarter.trim();
  a[i].CourseLevel = a[i].CourseLevel;
  a[i].CourseID = a[i].CourseID.split("\n")[0].trim();
  a[i].Title = a[i].Title;
  a[i].Full = a[i].Full;
  a[i].Instructor = a[i].Instructor.split("\n")[0].trim();
  a[i].Days = dayToString(a[i].Days);
  a[i].Time = a[i].Time.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
  a[i].Subject = a[i].Subject.split("-")[0].trim();
}

function timeToArray(string){

}

function dayToArray(string){
  var a = string.split(" ");
  var result = "";
  for(var i in a){
    console.log(a[i]);
    switch(a[i]){
      case "M":
        result += ("Monday");
        break;
      case "T":
        result+=(",Tuesday");
        break;
      case "W":
        result+=(",Wednesday");
        break;
      case "R":
        result+=(",Thursday");
        break;
      case "F":
        result+=(",Friday");
        break;
      default: result += "";
    }
  }
  return result;
}
