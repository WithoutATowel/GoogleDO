var tasks = {};
var taskDue = "";
var ldap = "brettspencer";
var requestURL = "https://script.google.com/macros/s/djihwerd98ejdeijded/exec?ldap="
var fakeTasks = {
	"1410709882" : {
		"task_name" : "Eat pizza",
		"due" : "today"
	},
	"1410913315" : {
		"task_name" : "Take out trash",
		"due" : "today"
	},
	"1410509882" : {
		"task_name" : "Eat icecream",
		"due" : "tomorrow"
	}
};
window.onload = function(){
	//iniatialize
	requestURLTasks = requestURL + ldap;
    tasks = new XMLHttpRequest();
    //tasks.open("GET", requestURLTasks, false);
	buildTasks(fakeTasks);
	addEventHandlers();
};

function addEventHandlers() {
	$(".icon-folders").click(folderView);
	$(".icon-date.selected").click(calendarView);
	$(".category.clearfix").click(taskSectionToggle);
	$(".quickadd-button").click(newTaskWindow);
	$(".check-button").click(taskComplete);
	$(".task-box").find("input").blur(function(event){
		$(".task-box").css('display', 'none');
	});
	$(".task-box").find("input").keypress(function(event){
		if(event.which == 13) {
			newTask();
			return false;
		};
	});
};

function buildTasks(tasks){
	var todayCount = 0;
	var tomorrowCount = 0;
	var upcomingCount = 0;
	var somedayCount = 0;
	$.each(tasks, function(task_id, value) {
		if(value.due == "today") {
			todayCount++
		} else if(value.due == "tomorrow") {
			tomorrowCount++
		} else if(value.due == "upcoming") {
			upcomingCount++
		} else {
			somedayCount++
		};
		$("#" + value.due).append('<li class="task normal" id=' + task_id + '><div class="container"><div class="check-button"></div><div class="delete-button"></div><div class="drag-button"></div><div class="summary no-description">' + value.task_name + '</div><div class="summaryContainer"><textarea class="summary no-description" maxlength="1000" rows="1"></textarea><div class="summary summaryShadow">' + value.task_name + '</div><div class="summaryShadow2Container"><div class="summary summaryShadow2">' + value.task_name + '</div></div></div><div class="description"></div></div></li>');
	});
	if(todayCount != 0) {
		$("#today").siblings("li").find(".details").append('(' + todayCount + ')');
	};
	if(tomorrowCount != 0) {
		$("#tomorrow").siblings("li").find(".details").append('(' + tomorrowCount + ')');
	};
	if(upcomingCount != 0) {
		$("#upcoming").siblings("li").find(".details").append('(' + upcomingCount + ')');
	};
	if(somedayCount != 0) {
		$("#someday").siblings("li").find(".details").append('(' + somedayCount + ')');
	};
};

function folderView(){
  $(".icon-folders").attr('class', 'icon-folders selected');
  $(".icon-date.selected").attr('class', 'icon-date');
  $(".tasks-wrapper-label").css('display', 'block');
  $(".tasks-wrapper-calendar").css('display', 'none');
  $(".tasks-wrapper-label").css("background-color", "white");
};

function calendarView(){
  $(".icon-folders.selected").attr('class', 'icon-folders');
  $(".icon-date").attr('class', 'icon-date selected');
  $(".tasks-wrapper-label").css('display', 'none');
  $(".tasks-wrapper-calendar").css('display', 'block');
  $(".tasks-wrapper-calendar").css("background-color", "white");
};

function taskSectionToggle(event){
	var currentState = $(event.delegateTarget).siblings('ul').css('display')
	if(currentState == "none") {
		$(event.delegateTarget).siblings("ul").css('display', 'block');
	} else {
		$(event.delegateTarget).siblings("ul").css('display', 'none');
	};  
};

function newTaskWindow(event){
	taskDue = $(event.delegateTarget).siblings(".name").text();
	$(".task-box").css('display', 'inline');
	$(".task-box").find("input").focus();
};

function newTask(){
	var taskName = $(".task-box").find("input").val();
	taskName = escape(taskName);
	var newTaskURL = requestURL + ldap + '&task_name=' + taskName + '&due_date=' + taskDue.toLowerCase();
	var tasks = new XMLHttpRequest();
	//tasks.open("GET", newTaskURL, false);
	$(".task.normal").remove();
	buildTasks(fakeTasks);
	addEventHandlers();
	$(".task-box").find("input").val() = '';
	$(".task-box").css('display', 'none');
};

function taskComplete(event){
	var taskCompleteID = $(event.delegateTarget).parents().eq(1).attr('id')
	var completeURL = requestURL + ldap + '&task_id=' + taskCompleteID + '&status=complete';
	var taskCompleteCall = new XMLHttpRequest();
	//taskCompleteCall.open("GET", completeURL, false);
	itemCount = $(event.delegateTarget).parents().eq(2).siblings("li").children(".details").text();
	itemCount = itemCount.charAt(1);
	itemCount = parseInt(itemCount);
	itemCount--;
	if(itemCount > 0) {
		$(event.delegateTarget).parents().eq(2).siblings("li").children(".details").text('(' + itemCount + ')');
	} else {
		$(event.delegateTarget).parents().eq(2).siblings("li").children(".details").text('');
	};
	$(event.delegateTarget).parents().eq(1).remove();
};