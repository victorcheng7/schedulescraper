var fs = require('fs');

fs.readFile('./winter2018.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var a = JSON.parse(data);
  console.log(a[0]);
  console.log(clean(a[0]));

  /*
  for(var i in a){

  }
  fs.writeFile("./output.txt", JSON.stringify(result), function(err){
    if(err) return console.log(err);
    console.log("Filed saved!");
  });*/
});

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
  var result = [];
  for(var i in a){
    switch(a[i]){
      case "M": result.push(1);
      case "T": result.push(2);
      case "W": result.push(3);
      case "R": result.push(4);
      case "F": result.push(5);
      default: console.log("Weird day " + a[i]);
    }
  }
  return result;
}
