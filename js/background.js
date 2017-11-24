chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if(request["toSearch"] != null){
      //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
      var lowerCaseToSearch = request["toSearch"].toLowerCase().trim();
      if(request["transcript"] != null) var lowerCaseTranscript = request["transcript"].toLowerCase(); //make transcript lowercase
      search(lowerCaseToSearch, lowerCaseTranscript, request["title"], request["url"], request["transcriptCues"], request["toggle"], request["maxCueLength"], sendResponse);
      //request["toggle"] -> 0 = exact, 1 = loose, 2 = invideo
    }
    if(request["sendToServer"]){
      if(request["sendKeywords"]) server(request["toSearch"], request["userid"], request["url"], 2, request["title"], request["on"], request["keywords"]);
      else if(request["toSearch"] == null) server(request["toSearch"],  request["userid"], request["url"], 0, request["title"], request["on"]);
      else server(request["toSearch"], request["userid"], request["url"], 1);
    }
});

function server(toSearch, userid, url, check, title, on, keywords){
    var xhttp = new XMLHttpRequest();
    if(check === 0){ //First time website send video they're on
      xhttp.open("POST", "https://invideo.herokuapp.com/transcript");
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({"userid": userid, "url": url, "title": title, "on": on}));
      xhttp.onreadystatechange = function() {
        if(xhttp.status == 200 && xhttp.readyState == 4) {
           console.log(xhttp.responseText);
        }
      }
    }
    else if(check === 1) { //When you're searching for result
      xhttp.open("POST", "https://invideo.herokuapp.com/notranscript");
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({"toSearch": toSearch, "userid": userid, "url": url}));
      xhttp.onreadystatechange = function() {
        if(xhttp.status == 200 && xhttp.readyState == 4) {
           console.log(xhttp.responseText);
        }
      }
    }
    else if(check === 2){
      xhttp.open("POST", "https://invideo.herokuapp.com/keywords");
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({"keywords": keywords, "url":url, "title": title}));
      xhttp.onreadystatechange = function() {
        if(xhttp.status == 200 && xhttp.readyState == 4) {
           console.log(xhttp.responseText);
        }
      }
    }
}
