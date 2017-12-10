var fs = require('fs');
var toSearch = "network";
console.log("Searching for", `${toSearch}...`);

let data = function(filename){
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', (err, data) => {
      if(err) reject(err);
      resolve(JSON.parse(data));
    })
  })
}

data('./output.txt').then(a => {
  console.log(a.length);
  var exactSearchResult = exactSearch(toSearch, a);
  console.log(exactSearchResult);
});

function exactSearch(toSearch, a){
  var result = [];
  for(var i in a){
    Object.keys(a[i]).forEach(function(key){
      var text = a[i][key].toLowerCase();
      if(text.indexOf(toSearch) >= 0) {
        result.push(a[i]);
        return;
      }
    });
  }
  return result;
}
