var e_subjectArea = document.getElementById('ctl00_pageContent_courseList');
var e_quarter = document.getElementById('ctl00_pageContent_quarterList');
var e_courseLevel = document.getElementById('ctl00_pageContent_dropDownCourseLevels');
var e_searchButton = document.getElementById('ctl00_pageContent_searchButton');


main();
function main(){
  for(var i = 0; i < e_subjectArea.length; i++){
    selectSubjectArea(i);
    for(var j = 0; j < e_quarter.length; j++){
      selectQuarter(j);
      for(var k = 0; k < e_courseLevel.length; k++){
        selectQuarter(k);
        clickSearch();
      }
    }
  }
}

function selectSubjectArea(index){
  if(index > e_subjectArea.length) return;
  e_subjectArea[index].selected="true";
}

function selectQuarter(index){
  if(index > e_quarter.length) return;
  e_quarter[index].selected = "true";
}

function selectCourseLevel(index){
  if(index > e_courseLevel.length) return;
  e_courseLevel[index].selected = "true";
}

function clickSearch(){
  e_searchButton.click();
}
