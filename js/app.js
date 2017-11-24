var e_subjectArea = document.getElementById('ctl00_pageContent_courseList');
var e_quarter = document.getElementById('ctl00_pageContent_quarterList');
var e_courseLevel = document.getElementById('ctl00_pageContent_dropDownCourseLevels');
var e_searchButton = document.getElementById('ctl00_pageContent_searchButton');

main();
function main(){
  var totalCourses = [];
  for(var i = 0; i < e_subjectArea.length; i++){
    var subject = selectSubjectArea(i);
    for(var j = 0; j < e_quarter.length; j++){
      var quarter = selectQuarter(j);
      for(var k = 0; k < e_courseLevel.length; k++){
        var courseLevel = selectCourseLevel(k);
        clickSearch();
        totalCourses.concat(getData(subject, quarter, courseLevel));
      }
    }
  }
  console.log(totalCourses); //TODO make this less elements
}

function getData(subject, quarter, courseLevel){
  var coursesHTML = document.getElementsByClassName('gridview')[0].children[1].children;
  var coursesArray = [];
  for(var i = 0; i < coursesHTML.length; i++){
    var masterTable = courseHTML[i];// TODO fix
    var course = {
      Subject : subject,
      Quarter: quarter,
      CourseLevel: courseLevel,
      CourseID : ,
      Title,
      Full,
      Instructor,
      Days,
      Time,
      Location,
      MaxEnrolledCount,
      CurrentEnrolled
      RMPscore,
      Description,
      Grading,
    }
    //TODO click on the full description AND get that data too
    courseArray.push(course);
  }
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
