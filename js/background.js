//Global variables for you to define
var subjects = 92;
var quarter = 0;
var courseLevel = 2;
//NOTE: The current setup assumes you know what subjectCounter, quarterCounter, and courseLevel you want
var subjectCounter = 0,
  courseLevelCounter = 0,
  quarterCounter = 0,
  counter = 0;

var scrape = false;
var content = [];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo && changeInfo.status == "complete"){
    if(counter >= subjects*courseLevel*((quarter == 0) ? 1 : quarter)) sendToServer();
    if(tab.url == "https://my.sa.ucsb.edu/public/curriculum/coursesearch.aspx" && counter < subjects*courseLevel*((quarter == 0) ? 1 : quarter)){
      if(!scrape){
        setCriteriaMessage(tabId);
        scrape = true;
      }
      else{
        scrapeMessage(tabId);
        scrape = false;
      }
      counter++;
    }
  }
});

function scrapeMessage(tabId){
  chrome.tabs.sendMessage(tabId, {scrape: true, "subject": subjectCounter % subjects, "quarter": quarterCounter, "courseLevel": courseLevelCounter % courseLevel}, function(response) {
    console.log("Scraped ", response["data"]);
    content.concat(response["data"]);
  });
}

function setCriteriaMessage(tabId){
  chrome.tabs.sendMessage(tabId, {scrape: false, "subject": subjectCounter, "quarter": quarterCounter, "courseLevel": courseLevelCounter}, function(response) {
    if(subjectCounter % subjects == 0) courseLevel++;
    subjectCounter++;
    console.log("Successfully set ", response["quarter"], " ", response["courseLevel"], " ", response["subject"]);
  });
}

function sendToServer(){
  console.log("CONTENT: ", content);
  /*
  (function(response) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
      if(xhttp.status == 200 && xhttp.readyState == 4) {
        // Successful response
        // console.log(xhttp.responseText);
      }
    }
    for(var i in response){
      console.log("Index " + i + " contains " + response[i]);
    }
    xhttp.send(JSON.stringify(response));
  })(response)*/
}
