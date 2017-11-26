var e_subjectArea = document.getElementById('ctl00_pageContent_courseList');
var e_quarter = document.getElementById('ctl00_pageContent_quarterList');
var e_courseLevel = document.getElementById('ctl00_pageContent_dropDownCourseLevels');
var e_searchButton = document.getElementById('ctl00_pageContent_searchButton');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var quarter = request["quarter"];
  var courseLevel = request["courseLevel"];
  var subject = request["subject"];
  console.log(quarter, " ", courseLevel, " ", subject);
  if(request["scrape"]) {
    sendResponse({"data" : getData(e_subjectArea[subject].innerText, e_quarter[quarter].innerText, e_courseLevel[courseLevel].innerText)});
    window.location.reload();
  }
  else {
    selectQuarter(quarter);
    selectCourseLevel(courseLevel);
    selectSubjectArea(subject);
    clickSearch();
    sendResponse({"quarter": quarter, "courseLevel": courseLevel, "subject" : subject});
  }
});

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function getData(subject, quarter, courseLevel){
  var gridView = document.getElementsByClassName('gridview')[0].children[1];
  if(gridView == undefined) return [];
  var coursesHTML = gridView.children;
  var coursesArray = [];

  for(var i = 0; i < coursesHTML.length; i++){
    try{
      var basicInfo = coursesHTML[i].getElementsByClassName("Header Clickable"); //Basic Row Elements
      basicInfo[2].click(); //Click for master table
    }
    catch(e){
      continue;
    }

    var masterTable = coursesHTML[i].getElementsByClassName('MasterCourseTable')[0].querySelectorAll("tr"); // Table for extra data NOTE this may not work
    var CourseID = basicInfo[1].innerText
    CourseID = CourseID.substring(0, CourseID.indexOf("Click"));
    var course = {
      Subject : subject,
      Quarter: quarter,
      CourseLevel: courseLevel,
      CourseID : CourseID,
      Title: basicInfo[2].children[0].innerText,
      Full: basicInfo[3].innerText,
      Instructor: basicInfo[5].innerText,
      Days: basicInfo[6].innerText,
      Time: basicInfo[7].innerText,
      Location: basicInfo[8].innerText,
      MaxEnrolledCount: basicInfo[9].innerText.split("/")[1],
      CurrentEnrolled: basicInfo[9].innerText.split("/")[0],
      FullTitle: masterTable[1].children[1].innerText.trim(),
      Description: masterTable[2].children[1].innerText.trim(),
      PreRequisite: masterTable[3].children[1].innerText.trim(),
      College: masterTable[4].children[1].innerText.trim(),
      Units: masterTable[5].children[1].innerText.trim(),
      Grading: masterTable[6].children[1].innerText.trim(),
    }
    coursesArray.push(course);
    pause(91);
  }
  console.log(coursesArray);
  return coursesArray;
}

function selectSubjectArea(index){
  if(index > e_subjectArea.length) return;
  e_subjectArea[index].selected="true";
  return e_subjectArea[index].innerText;
}

function selectQuarter(index){
  if(index > e_quarter.length) return;
  e_quarter[index].selected = "true";
  return e_quarter[index].innerText;
}

function selectCourseLevel(index){
  if(index > e_courseLevel.length) return;
  e_courseLevel[index].selected = "true";
  return e_courseLevel[index].innerText;
}

function clickSearch(){
  e_searchButton.click();
}
