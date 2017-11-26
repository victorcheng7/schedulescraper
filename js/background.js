//Global variables for you to define
//var subjects = 92;
var subjects = 2;
var quarter = 1;
var courseLevel = 2;

//NOTE: The current setup assumes you know what subjectCounter, quarterCounter, and courseLevel you want
var subjectCounter = 0,
  courseLevelCounter = 0,
  quarterCounter = 0,
  scrape = false,
  content = [],
  counter = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo && changeInfo.status == "complete"){
    //var total = subjectCounter + courseLevelCounter + quarterCounter;
    if(counter >= subjects*courseLevel*quarter) sendToServer();
    if(tab.url == "https://my.sa.ucsb.edu/public/curriculum/coursesearch.aspx" && counter < subjects*courseLevel*((quarter == 0) ? 1 : quarter)){
      if(!scrape){
        setCriteriaMessage(tabId);
        scrape = true;
      }
      else{
        scrapeMessage(tabId);
        scrape = false;
        counter++;
      }
    }
  }
});

function scrapeMessage(tabId){
  chrome.tabs.sendMessage(tabId, {scrape: true, "subject": subjectCounter % subjects, "quarter": quarterCounter % quarter, "courseLevel": courseLevelCounter % courseLevel}, function(response) {
    console.log("Scraped ", response["data"]);
    content = content.concat(response["data"]);
  });
}

function setCriteriaMessage(tabId){
  chrome.tabs.sendMessage(tabId, {scrape: false, "subject": subjectCounter % subjects, "quarter": quarterCounter & quarter, "courseLevel": courseLevelCounter % courseLevel}, function(response) {
    if((subjectCounter+1) % subjects == 0 && subjectCounter != 0) courseLevelCounter++;
    subjectCounter++;
    console.log("Successfully set ",response["subject"], " ", response["quarter"], " ", response["courseLevel"]);
  });
}

function sendToServer(){
  console.log("CONTENT: ", content);
  (function(response) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:5000/");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
      if(xhttp.status == 200 && xhttp.readyState == 4) {
        console.log(xhttp.responseText);
      }
    }
    xhttp.send(JSON.stringify(response));
  })(content)
}
